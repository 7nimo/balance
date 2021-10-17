import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

export interface HttpExceptionResponse {
  statusCode: number;
  error: string;
  errors: any;
  message: string;
}

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    const errorResponse = exception.getResponse();

    Logger.error(
      exception.message,
      (exception as any).stack,
      `${request.method} ${request.url}`,
    );

    response.status(status).json({
      status: exception.getStatus(),
      message: exception.message,
      errors: (errorResponse as HttpExceptionResponse).errors,
      // timestamp: new Date().toISOString(),
      // path: request.url,
    });
  }
}
