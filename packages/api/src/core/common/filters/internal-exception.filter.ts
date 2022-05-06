import { Catch, ArgumentsHost, Logger, HttpException } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Request } from 'express';

@Catch(HttpException)
export class InternalExceptionFilter extends BaseExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    super.catch(exception, host);

    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const message = (exception as any).message;

    Logger.error(
      message,
      (exception as any).stack,
      `${request.method} ${request.url}`,
    );
  }
}
