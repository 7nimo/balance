import { HttpStatus, ValidationPipeOptions } from '@nestjs/common';

// https://github.com/typestack/class-validator/issues/169
export const validationPipeOptions: ValidationPipeOptions = {
  stopAtFirstError: true,
  forbidUnknownValues: true,
  whitelist: true,
  forbidNonWhitelisted: true,
  errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
  transform: true,
  validationError: {
    target: true,
  },
  // exceptionFactory: (errors) => new UnprocessableEntityException(errors),
};
