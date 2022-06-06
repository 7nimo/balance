import { Logger, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './core/auth/auth.module';
import { LoggerMiddleware } from './core/common/middleware/logger.middleware';
import { AccountsModule } from './modules/account/account.module';
import { RouterModule } from '@nestjs/core';
import { DatabaseModule } from './core/database/database.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { TransactionsModule } from './modules/transaction/transaction.module';
import { ContextModule } from './modules/context/context.module';
import { ConfigModule } from '@nestjs/config';
import multerConfig from './core/etc/multer.config';
import swaggerConfig from './core/etc/swagger.config';

@Module({
  providers: [Logger],
  imports: [
    AccountsModule,
    AuthModule,
    ContextModule,
    ConfigModule.forRoot({
      load: [multerConfig, swaggerConfig],
    }),
    DatabaseModule,
    EventEmitterModule.forRoot(),
    RouterModule.register([
      {
        path: '/account/:accountId',
        module: TransactionsModule,
      },
    ]),
    TransactionsModule,
    UserModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
