export interface User {
  id: string;
  email: string;
  password: string;
  baseCurrency: string;
  createdAt: Date;
  modifiedAt: Date;
}

export type SignInPayload = Pick<User, "email" | "password"> & {
  remember?: Boolean;
};

export type SignUpPayload = Pick<User, "email" | "password">;