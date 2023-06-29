import { Module } from '@nestjs/common'
import { OrdersService } from './orders.service'
import { OrdersController } from './orders.controller'
import { ClientsModule, Transport } from '@nestjs/microservices'

import { MongooseModule } from '@nestjs/mongoose'
import { Order, OrderSchema } from './order.schema'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
    ClientsModule.register([
      {
        name: 'ORDERS_PUBLISHER',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'orders',
            brokers: ['pkc-ymrq7.us-east-2.aws.confluent.cloud:9092'],
            ssl: true,
            sasl: {
              mechanism: 'plain',
              username: 'QOHX6MMYFI46OSQO',
              password:
                '1iZ2GLkvqIr0MnTM8hLeXlPoqnNdbNjZR0xEr2rpHB+7o6xe2i45BojezNl7mvhE',
            },
          },
        },
      },
    ]),
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
  exports: [OrdersService],
})
export class OrdersModule {}
