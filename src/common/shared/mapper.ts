import { UserDto } from "src/users/dto/user.dto";
import { User } from "src/users/user.entity";

export const toUserDto = (data: User): UserDto => {
  const { id, email } = data;
  let userDto: UserDto = { id, email };
  return userDto;
}