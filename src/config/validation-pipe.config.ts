import { HttpStatus, ValidationPipeOptions } from '@nestjs/common';

// https://github.com/typestack/class-validator/issues/169
export const validationPipeOptions: ValidationPipeOptions = {
  stopAtFirstError: true,
  forbidUnknownValues: true,
  errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
  // transform: true,
  // validationError: {
  //   target: true,
  // },
  // this should map errors 
  // exceptionFactory: (errors) => new UnprocessableEntityException(errors),
};
