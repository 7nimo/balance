export interface UserEntity {
  id: string;
  email: string;
  username: string;
  baseCurrency: string;
  createdAt: Date;
  updatedAt: Date;
}

export type LoginCredentials = {
  email: string;
  password: string;
};

export type RegisterCredentials = {
  email: string;
  username: string;
  password: string;
  baseCurrency?: number;
};
