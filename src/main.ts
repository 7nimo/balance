import * as dotenv from 'dotenv';
dotenv.config();
import { HttpAdapterHost, NestFactory, Reflector } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as helmet from 'helmet';
import { ClassSerializerInterceptor } from '@nestjs/common';
import { InternalExceptionsFilter } from './common/filters/internal-exceptions-filter.filter';
import { swaggerConfig, swaggerOptions } from './config/swagger.config';
import { ValidationPipe } from './common/pipes/validation.pipe';
// import { validationPipeOptions } from './config/validation-pipe.config';

async function bootstrap() {

  const appOptions = { cors: true };

  const app = await NestFactory.create(AppModule, appOptions);
  app.setGlobalPrefix('api');

  const document = SwaggerModule.createDocument(
    app,
    swaggerConfig,
    swaggerOptions,
  );
  SwaggerModule.setup('docs', app, document);

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new InternalExceptionsFilter(httpAdapter));
  // app.useGlobalPipes(new ValidationPipe(validationPipeOptions));
  app.useGlobalPipes(new ValidationPipe());

  app.use(helmet());

  await app.listen(process.env.SERVER_PORT || 3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
