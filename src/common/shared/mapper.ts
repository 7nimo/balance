import { UserDto } from 'src/users/dto/user.dto';
import { User } from 'src/users/entities/user.entity';

export const toUserDto = (user: User): UserDto => {
  // possibly a bug here?
  return new User(user);
};
