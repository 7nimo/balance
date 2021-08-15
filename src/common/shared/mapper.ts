import { UserDto } from "src/models/users/dto/user.dto";
import { User } from "src/models/users/entities/user.entity";

export const toUserDto = ({ id, email }: User): UserDto => {
  return { id, email };
}