import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountsController } from './account.controller';
import { accountProviders } from './account.provider';
import { DatabaseModule } from 'src/core/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [AccountsController],
  providers: [AccountService, ...accountProviders],
  exports: [AccountService],
})
export class AccountsModule {}
