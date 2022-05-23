import { Logger, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './core/auth/auth.module';
import { LoggerMiddleware } from './core/common/middleware/logger.middleware';
import { BanksModule } from './modules/bank/bank.module';
import { AccountsModule } from './modules/account/account.module';
import { RouterModule } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from './core/config/config.module';
import { DatabaseModule } from './core/database/database.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { CurrencyModule } from './modules/currency/currency.module';
import { TransactionsModule } from './modules/transaction/transaction.module';
import multerConfig from './config/multer.config';
import swaggerConfig from './config/swagger.config';

@Module({
  providers: [Logger],
  imports: [
    ConfigModule.forRoot({
      folder: './',
      load: [multerConfig, swaggerConfig],
    }),
    DatabaseModule,
    EventEmitterModule.forRoot(),
    TypeOrmModule,
    AccountsModule,
    AuthModule,
    BanksModule,
    CurrencyModule,
    UserModule,
    TransactionsModule,
    RouterModule.register([
      {
        path: '/account/:accountId',
        module: TransactionsModule,
      },
    ]),
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
