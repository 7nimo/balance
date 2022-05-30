import * as yup from 'yup';

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

export const registerSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(8).max(99).required(),
  username: yup.string().min(4).max(32).required()
}).required();

export type RegisterCredentials = yup.InferType<typeof registerSchema>
