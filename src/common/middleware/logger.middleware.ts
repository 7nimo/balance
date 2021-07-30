import { Injectable, NestMiddleware, Logger } from '@nestjs/common';

import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(request: Request, response: Response, next: NextFunction): void {
    const { ip, method, path, baseUrl } = request;
    const userAgent = request.get('user-agent') || '';
    const url = baseUrl + path;

    let errorMessage = null;

    request.on("error", error => {
      errorMessage = error.message;
    });

    response.on('finish', () => {
      const { statusCode, statusMessage } = response;

      this.logger.log(
        `${method} ${url} ${statusCode} ${statusMessage} | ${errorMessage} - ${userAgent} ${ip}`
      );
    });

    next();
  }
}