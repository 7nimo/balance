import { Module } from '@nestjs/common';
import { ContextService } from './context.service';
import { ContextController } from './context.controller';
import { contextProviders } from './context.provider';
import { DatabaseModule } from 'src/core/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [ContextService, ...contextProviders],
  controllers: [ContextController],
  exports: [ContextService],
})
export class ContextModule {}
