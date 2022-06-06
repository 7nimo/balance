/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  Controller,
  Get,
  Post,
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
import { TransactionEntity } from './entities/transaction.entity';
import { CsvParserService } from 'src/core/common/services/csv-parser/csv-parser.service';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { User } from 'src/core/common/decorators/user.decorator';
import { ConfigService } from '@nestjs/config';
import { multerOptions } from 'src/core/etc';

@ApiTags('transaction')
@Controller('transaction')
export class TransactionController {
  private readonly multerOptions: MulterOptions;
  constructor(
    private readonly accountService: AccountService,
    private readonly csvParserService: CsvParserService,
    private readonly configService: ConfigService,
    private readonly transactionService: TransactionService,
  ) {
    this.multerOptions = this.configService.get<MulterOptions>('multer');
  }

  @Post('import')
  @UseInterceptors(FileInterceptor('statement', multerOptions))
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

    this.transactionService.createMany(accountId, userId, transactions);
  }

  @Get()
  findAll(
    @User('id') userId: string,
    @Param('accountId', new ParseUUIDPipe({ version: '4' })) accountId: string,
  ): Promise<TransactionEntity[]> {
    return this.transactionService.findAll(userId, accountId);
  }

  @Get(':id')
  findOne(@User('id') userId: string, @Param('accountId') accountId: number) {
    return this.transactionService.findOne(userId, accountId);
  }
}
