import { Logger, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './core/auth/auth.module';
import { LoggerMiddleware } from './core/common/middleware/logger.middleware';
import { AccountsModule } from './modules/account/account.module';
import { RouterModule } from '@nestjs/core';
import { ConfigModule } from './core/config/config.module';
import { DatabaseModule } from './core/database/database.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { TransactionsModule } from './modules/transaction/transaction.module';
import multerConfig from './config/multer.config';
import swaggerConfig from './config/swagger.config';
import { ContextModule } from './modules/context/context.module';

@Module({
  providers: [Logger],
  imports: [
    AccountsModule,
    AuthModule,
    ContextModule,
    ConfigModule.forRoot({
      folder: './',
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
