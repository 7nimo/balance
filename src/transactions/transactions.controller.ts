import { Controller, Get, Post, Body, Param, Delete, HttpCode, ParseUUIDPipe, UseInterceptors, UploadedFile, HttpException, HttpStatus, Inject, forwardRef, NotFoundException } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/config/multer.config';
import { AccountsService } from 'src/accounts/accounts.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { StatementSavedEvent } from './events/statement-saved.event';

@ApiTags('transactions')
@Controller('transactions')
export class TransactionsController {
  constructor(
    private readonly transactionsService: TransactionsService,
    private readonly accountsService: AccountsService,
    private eventEmitter: EventEmitter2,
  ) { }

  @Post()
  create(@Body() createTransactionDto: CreateTransactionDto) {
    return this.transactionsService.create(createTransactionDto);
  }


  @Post(':uuid/import')
  @UseInterceptors(FileInterceptor('statement', multerOptions))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Param('uuid', new ParseUUIDPipe({ version: '4' })) uuid: string,
  ): Promise<void> {
    const account = await this.accountsService.findOne(uuid);
    if (account === undefined) {
      throw new NotFoundException(`Account with ${uuid} does not exist`);

    }
    const statementSavedEvent = new StatementSavedEvent();
    statementSavedEvent.id = uuid;
    statementSavedEvent.path = file.path;

    this.eventEmitter.emit('statement.saved', statementSavedEvent);
    return this.transactionsService.handleCsvImport(uuid, file.path)
  }

  @Get()
  findAll() {
    return this.transactionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.transactionsService.findOne(+id);
  }

  @HttpCode(204)
  @Delete(':uuid')
  remove(
    @Param('uuid', new ParseUUIDPipe({ version: '4' })) uuid: string,
  ): Promise<void> {
    return this.transactionsService.clear();
  }
}
