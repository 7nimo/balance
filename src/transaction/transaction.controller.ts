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
import { TransactionRO, TransactionsRO } from './transaction.interface';
import { CsvParserService } from 'src/common/services/csv-parser/csv-parser.service';
import { TransactionEntity } from './entities/transaction.entity';

@ApiTags('transaction')
@Controller('transaction')
export class TransactionController {
  constructor(
    private readonly transactionService: TransactionService,
    private readonly accountService: AccountService,
    private readonly eventEmitter: EventEmitter2,
    private readonly csvParser: CsvParserService,
  ) {}

  @Post()
  async create(
    @User('id') userId: string,
    @Param('accountId') accountId: string,
    @Body() createTransactionDto: CreateTransactionDto,
  ): Promise<TransactionRO> {
    const account = await this.accountService.findOne(userId, accountId);
    if (!account) {
      throw new NotFoundException(`Account with ${accountId} does not exist`);
    }

    return this.transactionService.create(accountId, createTransactionDto);
  }

  @Post('import')
  @UseInterceptors(FileInterceptor('statement', multerOptions))
  async import(
    @User('id') userId: string,
    @Param('accountId') accountId: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const account = await this.accountService.findOne(userId, accountId);
    if (!account) {
      throw new NotFoundException(`Account with ${accountId} does not exist`);
    }
    // const statementSavedEvent = new StatementSavedEvent();
    // statementSavedEvent.accountId = accountId;
    // statementSavedEvent.path = file.path;
    // this.eventEmitter.emit('statement.saved', statementSavedEvent);

    let transactions: TransactionEntity[] = []
    if (account.account.bank.name === 'Lloyds') {
      console.time('Lloyds');
      transactions = await this.csvParser.parseLloydsCsv(accountId, file.path);
      console.timeEnd('Lloyds');
    } else {
      console.time('mBank');
      transactions = await this.csvParser.parseMBankCsv(accountId, file.path);
      console.timeEnd('mBank');
    }

    this.transactionService.createMany(transactions);
  }

  @Get()
  findAll(
    @User('id') userId: string,
    @Param('accountId') accountId: string,
  ): Promise<TransactionsRO> {
    return this.transactionService.findAll(userId, accountId);
  }

  @Get(':id')
  findOne(@User('id') userId: string, @Param('accountId') accountId: number) {
    return this.transactionService.findOne(userId, accountId);
  }

  // temporary dev endpoint
  @HttpCode(204)
  @Delete('clear')
  remove(): Promise<void> {
    return this.transactionService.clear();
  }
}
