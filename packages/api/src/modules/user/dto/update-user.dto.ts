import { IntersectionType, OmitType, PartialType } from '@nestjs/swagger';
import { AdditionalUserInfo, CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends IntersectionType(
  PartialType(OmitType(CreateUserDto, ['email'] as const)),
  PartialType(AdditionalUserInfo),
) {}
