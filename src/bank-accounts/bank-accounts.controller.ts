import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  ParseUUIDPipe,
  HttpCode,
} from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { multerOptions } from 'src/config/multer.config';
import { BankAccountsService } from './bank-accounts.service';
import { CreateBankAccountDto } from './dto/create-bank-account.dto';
import { UpdateBankAccountDto } from './dto/update-bank-account.dto';
import { BankAccount } from './entities/bank-account.entity';
import { StatementSavedEvent } from './events/statement-saved.event';

@ApiTags('bank-accounts')
@Controller('bank-accounts')
export class BankAccountsController {
  constructor(
    private bankAccountsService: BankAccountsService,
    private eventEmitter: EventEmitter2,
  ) {}

  @Post()
  create(@Body() createBankAccountDto: CreateBankAccountDto) {
    return this.bankAccountsService.create(createBankAccountDto);
  }

  @Post()
  @HttpCode(202)
  @UseInterceptors(FileInterceptor('statement', multerOptions))
  async uploadFile(
    @Body() body: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const statementSavedEvent = new StatementSavedEvent();
    statementSavedEvent.path = file.path;

    this.eventEmitter.emit('statement.saved', statementSavedEvent);
  }

  @Get()
  findAll(): Promise<BankAccount[]> {
    return this.bankAccountsService.findAll();
  }

  @Get(':uuid')
  findOne(@Param('uuid', new ParseUUIDPipe({ version: '4' })) uuid: string) {
    return this.bankAccountsService.findOne(uuid);
  }

  @HttpCode(204)
  @Patch(':uuid')
  async update(
    @Param('uuid', new ParseUUIDPipe({ version: '4' })) uuid: string,
    @Body() updateBankAccountDto: UpdateBankAccountDto,
  ): Promise<void> {
    return this.bankAccountsService.update(uuid, updateBankAccountDto);
  }

  @Delete(':uuid')
  async remove(@Param('uuid', new ParseUUIDPipe({ version: '4' })) uuid: string): Promise<void> {
    this.bankAccountsService.remove(uuid);
  }
}
