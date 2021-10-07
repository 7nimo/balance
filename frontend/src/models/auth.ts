export interface Token {
  authToken: string;
  refreshToken: string;
  authTokenExpiry: number;
  refreshTokenExpiry: number;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export type RegisterCredentials = {
  email: string;
  password: string;
  baseCurrency?: number;
};
