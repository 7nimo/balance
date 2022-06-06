import { Module } from '@nestjs/common';
import { ContextService } from './context.service';
import { ContextController } from './context.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BankEntity } from './entities/bank.entity';
import { CurrencyEntity } from './entities/currency.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BankEntity, CurrencyEntity])],
  providers: [ContextService],
  controllers: [ContextController],
  exports: [ContextService],
})
export class ContextModule {}
