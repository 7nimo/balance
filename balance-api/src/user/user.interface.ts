import { UserEntity } from './entities/user.entity';

export interface LoginUserRO {
  id: string;
}

export interface UserRO {
  user: UserEntity;
}