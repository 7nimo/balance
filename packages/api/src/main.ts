import * as dotenv from 'dotenv';
dotenv.config();
import { HttpAdapterHost, NestFactory, Reflector } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as helmet from 'helmet';
// import * as csurf from 'csurf';
import * as cookieParser from 'cookie-parser';
import { ClassSerializerInterceptor } from '@nestjs/common';
import { InternalExceptionFilter } from './common/filters/internal-exception.filter';
import { swaggerConfig, swaggerOptions } from './config/swagger.config';
import { ValidationPipe } from './common/pipes/validation.pipe';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
// import { validationPipeOptions } from './config/validation-pipe.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const corsConfig = {
    credentials: true,
    origin: true,
  };

  app.setGlobalPrefix('api');
  app.enableCors(corsConfig);
  app.use(helmet());
  app.use(cookieParser());
  // app.use(csurf());

  const document = SwaggerModule.createDocument(
    app,
    swaggerConfig,
    swaggerOptions,
  );
  SwaggerModule.setup('docs', app, document);

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.useGlobalPipes(new ValidationPipe());

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new InternalExceptionFilter(httpAdapter));
  app.useGlobalFilters(new HttpExceptionFilter());

  // app.useGlobalPipes(new ValidationPipe(validationPipeOptions));

  await app.listen(process.env.SERVER_PORT || 4200);
  console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
