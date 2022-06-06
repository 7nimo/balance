import {
  HttpStatus,
  UnprocessableEntityException,
  ValidationError,
  ValidationPipeOptions,
} from '@nestjs/common';
import { registerAs } from '@nestjs/config';

const validationPipeOptions: ValidationPipeOptions = {
  forbidUnknownValues: true,
  whitelist: true,
  forbidNonWhitelisted: true,
  errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
  transform: true,
  validateCustomDecorators: true,
  exceptionFactory: (errors: ValidationError[]) =>
    new UnprocessableEntityException(errors.map((error) => mapError(error))),
};

const mapError = (error: ValidationError) => {
  const mappedError = {
    field: error.property,
    errors: error.constraints,
    children: (children?: ValidationError[]) =>
      children.map((child: ValidationError) => mapError(child)),
  };
  return mappedError;
};

export default registerAs('validationPipe', () => ({
  validationPipeOptions,
}));
