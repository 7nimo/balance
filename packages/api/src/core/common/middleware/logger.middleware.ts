import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger('HTTP');

  use(req: Request, res: Response, next: NextFunction): void {
    const { ip, method, path, baseUrl } = req,
      userAgent = req.get('user-agent') || '',
      url = baseUrl + path;

    res.on('close', () => {
      this.logger.log(
        `${method} ${url} ${res.statusCode} ${res.statusMessage} | ${userAgent} ${ip}`,
      );
    });

    next();
  }
}
