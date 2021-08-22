import { UserDto } from 'src/users/dto/user.dto';
import { User } from 'src/users/entities/user.entity';

export const toUserDto = ({ id, email }: User): UserDto => {
  return { id, email };
};
