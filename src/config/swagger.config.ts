import { DocumentBuilder, SwaggerDocumentOptions } from '@nestjs/swagger';

  export const swaggerConfig = new DocumentBuilder()
    .setTitle('Balance API')
    .setDescription('Balance API docs')
    .setVersion('1.0')
    .addTag('balance')
    .addBearerAuth()
    .build();

  export const swaggerOptions: SwaggerDocumentOptions = {
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
  };