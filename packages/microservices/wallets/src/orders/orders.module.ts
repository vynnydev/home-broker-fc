import { Module } from '@nestjs/common'
import { OrdersService } from './orders.service'
import { OrdersController } from './orders.controller'
import { ClientsModule, Transport } from '@nestjs/microservices'

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'ORDERS_PUBLISHER',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'orders',
            brokers: ['pkc-ymrq7.us-east-2.aws.confluent.cloud:9092'],
            sasl: {
              mechanism: 'plain',
              username: 'QOHX6MMYFI46OSQO',
              password:
                '1iZ2GLkvqIr0MnTM8hLeXlPoqnNdbNjZR0xEr2rpHB+7o6xe2i45BojezNl7mvhE',
            },
            ssl: true,
          },
        },
      },
    ]),
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
