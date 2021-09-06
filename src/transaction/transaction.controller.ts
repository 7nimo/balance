import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  UseInterceptors,
  UploadedFile,
  NotFoundException,
} from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/config/multer.config';
import { AccountService } from 'src/account/account.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { StatementSavedEvent } from './events/statement-saved.event';
import { CreateTransactionDto } from './dto';
import { User } from '../common/decorators/user.decorator';
import { TransactionsRO } from './transaction.interface';

@ApiTags('transaction')
@Controller('transaction')
export class TransactionController {
  constructor(
    private readonly transactionService: TransactionService,
    private readonly accountService: AccountService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  @Post()
  create(@Body() createTransactionDto: CreateTransactionDto) {
    return this.transactionService.create(createTransactionDto);
  }

  @Post('import')
  @UseInterceptors(FileInterceptor('statement', multerOptions))
  async uploadFile(
    @User('id') userId: string,
    @UploadedFile() file: Express.Multer.File,
    @Param('uuid') uuid: string,
  ): Promise<void> {
    const account = await this.accountService.findOne(userId, uuid);
    if (account === undefined) {
      throw new NotFoundException(`Account with ${uuid} does not exist`);
    }
    const statementSavedEvent = new StatementSavedEvent();
    statementSavedEvent.id = uuid;
    statementSavedEvent.path = file.path;

    this.eventEmitter.emit('statement.saved', statementSavedEvent);
    // return this.transactionService.handleCsvImport(uuid, file.path);
  }

  @Get()
  findAll(
    @User('id') userId: string,
    @Param('accountId') accountId: string,
  ): Promise<TransactionsRO> {
    return this.transactionService.findAll(accountId, userId);
  }

  @Get(':id')
  findOne(
    @User('id') userId: string,
    @Param('id') accountId: number) {
    return this.transactionService.findOne(userId, accountId);
  }

  // temporary dev endpoint
  @HttpCode(204)
  @Delete('clear')
  remove(): Promise<void> {
    return this.transactionService.clear();
  }
}
