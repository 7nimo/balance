import { UserEntity } from './entities/user.entity';

export interface UserData {
  id: string;
  email: string;
  baseCurrency: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserRO {
  user: UserEntity;
}
