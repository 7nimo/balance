import { Module } from '@nestjs/common';
import { BanksService } from './bank.service';
import { BanksController } from './bank.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BankEntity } from './entities/bank.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BankEntity])],
  controllers: [BanksController],
  providers: [BanksService],
})
export class BanksModule {}
