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
import { DeleteResult, UpdateResult } from 'typeorm';
import { AccountsService } from './accounts.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { Account } from './entities/account.entity';
import { StatementSavedEvent } from './events/statement-saved.event';

@ApiTags('accounts')
@Controller('accounts')
export class AccountsController {
  constructor(
    private accountsService: AccountsService,
    private eventEmitter: EventEmitter2,
  ) {}

  @Post()
  create(@Body() createAccountDto: CreateAccountDto): Promise<Account> {
    return this.accountsService.create(createAccountDto);
  }

  @Post(':uuid')
  @HttpCode(202)
  @UseInterceptors(FileInterceptor('statement', multerOptions))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Param('uuid', new ParseUUIDPipe({ version: '4' })) uuid: string
  ) {
    const statementSavedEvent = new StatementSavedEvent();
    statementSavedEvent.id = uuid;
    statementSavedEvent.path = file.path;

    this.eventEmitter.emit('statement.saved', statementSavedEvent);
  }

  @Get()
  findAll(): Promise<Account[]> {
    return this.accountsService.findAll();
  }

  @Get(':uuid')
  findOne(@Param('uuid', new ParseUUIDPipe({ version: '4' })) uuid: string) {
    return this.accountsService.findOne(uuid);
  }

  @HttpCode(204)
  @Patch(':uuid')
  async update(
    @Param('uuid', new ParseUUIDPipe({ version: '4' })) uuid: string,
    @Body() updateAccountDto: UpdateAccountDto,
  ): Promise<UpdateResult> {
    return this.accountsService.update(uuid, updateAccountDto);
  }

  @Delete(':uuid')
  async remove(
    @Param('uuid', new ParseUUIDPipe({ version: '4' })) uuid: string,
  ): Promise<DeleteResult> {
    return this.accountsService.remove(uuid);
  }
}
