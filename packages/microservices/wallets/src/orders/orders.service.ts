/* eslint-disable no-useless-constructor */
import { Inject, Injectable } from '@nestjs/common'
import { ClientKafka } from '@nestjs/microservices'
import { PrismaService } from 'src/prisma/prisma/prisma.service'

import { InitTransactionDTO, InputExecuteTransactionDTO } from './order.dto'
import { OrderStatus, OrderType } from '@prisma/client'

@Injectable()
export class OrdersService {
  constructor(
    private prismaService: PrismaService,
    @Inject('ORDERS_PUBLISHER')
    private readonly kafkaClient: ClientKafka,
  ) {}

  all(filter: { wallet_id: string }) {
    return this.prismaService.order.findMany({
      where: {
        wallet_id: filter.wallet_id,
      },
      include: {
        Transactions: true,
        Asset: {
          select: {
            id: true,
            symbol: true,
          },
        },
      },
      orderBy: {
        updated_at: 'desc',
      },
    })
  }

  async initTransaction(input: InitTransactionDTO) {
    const order = await this.prismaService.order.create({
      data: {
        asset_id: input.asset_id,
        wallet_id: input.wallet_id,
        shares: input.shares,
        partial: input.shares,
        price: input.price,
        type: input.type,
        status: OrderStatus.PENDING,
        version: 1,
      },
    })

    // publicar no kafka
    this.kafkaClient.emit('input', {
      order_id: order.id,
      investor_id: order.wallet_id,
      asset_id: order.asset_id,
      // current_shares: order.shares,
      shares: order.shares,
      price: order.price,
      order_type: order.type,
    })

    return order
  }

  async executeTransaction(input: InputExecuteTransactionDTO) {
    // adicionar a transação em order --- done
    // transação atómica e travamento => se alguma transação falhar, será descartado
    // tudo o que foi feito.
    return this.prismaService.$transaction(async (prisma) => {
      const order = await prisma.order.findFirstOrThrow({
        where: { id: input.order_id },
      })
      // optimistic lock
      // atualizar a versão da ordem e da carteira
      await prisma.order.update({
        where: { id: input.order_id, version: order.version },
        data: {
          partial: order.partial - input.negotiated_shares,
          status: input.status,
          Transactions: {
            create: {
              broker_transaction_id: input.broker_transaction_id,
              related_investor_id: input.related_investor_id,
              shares: input.negotiated_shares,
              price: input.price,
            },
          },
          version: { increment: 1 },
        },
      })
      // contabilizar a quantidade de ativos na carteira
      // atualizar o preço do ativo
      // atualizar o status da ordem OPEN ou CLOSED
      if (input.status === OrderStatus.CLOSED) {
        await prisma.asset.update({
          where: { id: order.asset_id },
          data: {
            price: input.price,
          },
        })
        const walletAsset = await prisma.walletAsset.findUnique({
          where: {
            wallet_id_asset_id: {
              asset_id: order.asset_id,
              wallet_id: order.wallet_id,
            },
          },
        })
        if (walletAsset) {
          // se eu tiver o ativo na carteira, atualiza a quantidade de ativos
          await prisma.walletAsset.update({
            where: {
              wallet_id_asset_id: {
                asset_id: order.asset_id,
                wallet_id: order.wallet_id,
              },
              version: walletAsset.version,
            },
            data: {
              shares:
                order.type === OrderType.BUY
                  ? walletAsset.shares + order.shares
                  : walletAsset.shares - order.shares,
              version: { increment: 1 },
            },
          })
        } else {
          // só poderia adicionar na carteira se a order for de compra
          await prisma.walletAsset.create({
            data: {
              asset_id: order.asset_id,
              wallet_id: order.wallet_id,
              shares: input.negotiated_shares,
              version: 1,
            },
          })
        }
      }
    })
  }
}
