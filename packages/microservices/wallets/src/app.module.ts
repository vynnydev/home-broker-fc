import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AssetsModule } from './assets/assets.module'
import { WalletsModule } from './wallets/wallets.module'
import { OrdersModule } from './orders/orders.module'
import { PrismaModule } from './prisma/prisma.module'

@Module({
  imports: [PrismaModule, OrdersModule, AssetsModule, WalletsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
