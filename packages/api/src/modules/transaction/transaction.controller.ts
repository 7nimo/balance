/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseInterceptors,
  UploadedFile,
  NotFoundException,
  ParseUUIDPipe,
} from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { AccountService } from 'src/modules/account/account.service';
// import { EventEmitter2 } from '@nestjs/event-emitter';
// import { StatementSavedEvent } from './events/statement-saved.event';
import { CreateTransactionDto } from './dto';
import { TransactionRO, TransactionsRO } from './transaction.interface';
import { TransactionEntity } from './entities/transaction.entity';
import { CsvParserService } from 'src/core/common/services/csv-parser/csv-parser.service';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { User } from 'src/core/common/decorators/user.decorator';
import { ConfigService } from '@nestjs/config';

@ApiTags('transaction')
@Controller('transaction')
export class TransactionController {
  private readonly multerConfig: MulterOptions | undefined;
  constructor(
    private readonly transactionService: TransactionService,
    private readonly accountService: AccountService,
    // private readonly eventEmitter: EventEmitter2,
    private readonly csvParserService: CsvParserService,
    private readonly configService: ConfigService,
  ) {
    this.multerConfig = this.configService.get<MulterOptions>('multer');
  }

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
  @UseInterceptors(FileInterceptor('statement'))
  async import(
    @User('id') userId: string,
    @Param('accountId', new ParseUUIDPipe({ version: '4' })) accountId: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const account = await this.accountService.findOne(userId, accountId);
    if (!account) {
      throw new NotFoundException(
        `Account with id ${accountId} does not exist`,
      );
    }

    const transactions: TransactionEntity[] = await this.csvParserService.parse(
      account,
      file.path,
    );

    this.transactionService.createMany(transactions);
  }

  @Get()
  findAll(
    @User('id') userId: string,
    @Param('accountId', new ParseUUIDPipe({ version: '4' })) accountId: string,
  ): Promise<TransactionsRO> {
    return this.transactionService.findAll(userId, accountId);
  }

  @Get(':id')
  findOne(@User('id') userId: string, @Param('accountId') accountId: number) {
    return this.transactionService.findOne(userId, accountId);
  }
}
