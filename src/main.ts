import * as dotenv from 'dotenv';
dotenv.config();
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common';
import { validationPipeOptions } from './config/validation-pipe.config';
import { InternalExceptionsFilter } from './common/filters/internal-exceptions-filter.filter';
import { swaggerConfig, swaggerOptions } from './config/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log'],
  });

  const document = SwaggerModule.createDocument(
    app,
    swaggerConfig,
    swaggerOptions,
  );
  SwaggerModule.setup('swagger', app, document);

  app.use(helmet());

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new InternalExceptionsFilter(httpAdapter));
  app.useGlobalPipes(new ValidationPipe(validationPipeOptions));

  await app.listen(process.env.SERVER_PORT || 3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
