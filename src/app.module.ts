import { Logger, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './user/user.module';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { TransactionsModule } from './transaction/transaction.module';
import { BanksModule } from './bank/bank.module';
import { AccountsModule } from './account/account.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { CurrencyModule } from './currency/currency.module';
import { RouterModule } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot(),
    EventEmitterModule.forRoot(),
    UsersModule,
    DatabaseModule,
    AuthModule,
    TransactionsModule,
    BanksModule,
    AccountsModule,
    CurrencyModule,
    RouterModule.register([
      {
        path: '/accounts/:accountId',
        module: TransactionsModule,
      },
    ]),
  ],
  providers: [Logger],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
