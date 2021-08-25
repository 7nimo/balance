import {
  ClassSerializerInterceptor,
  Logger,
  MiddlewareConsumer,
  Module,
  NestModule,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { TransactionsModule } from './transactions/transactions.module';
import { BanksModule } from './banks/banks.module';
import { AccountsModule } from './accounts/accounts.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { CurrencyModule } from './currency/currency.module';
import { APP_INTERCEPTOR } from '@nestjs/core';

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
  ],
  controllers: [AppController],
  providers: [
    Logger,
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
