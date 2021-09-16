export interface User {
  id: string;
  email: string;
  baseCurrency: string;
  createdAt: Date;
  modifiedAt: Date;
}

export interface LoginCredentials {
  email: string;
  password: string;
  remember?: Boolean;
};

export type RegisterCredentials = {
  email: string;
  password: string;
  baseCurrency?: number;
};
