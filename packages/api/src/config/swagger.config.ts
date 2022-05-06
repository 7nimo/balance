import { registerAs } from '@nestjs/config';
import { DocumentBuilder, SwaggerDocumentOptions } from '@nestjs/swagger';

export type SwaggerConfigObject = {
  config: DocumentBuilder;
  options: SwaggerDocumentOptions;
};

export const swaggerOptions: SwaggerDocumentOptions = {
  operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
};

export default registerAs('swagger', () => ({
  ...swaggerOptions,
}));
