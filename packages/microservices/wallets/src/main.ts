import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { Transport } from '@nestjs/microservices'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true })

  app.connectMicroservice({
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
      }
    },
  })
  
  await app.startAllMicroservices()
  await app.listen(3000)
}
bootstrap()
