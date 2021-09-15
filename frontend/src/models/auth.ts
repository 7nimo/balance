export interface Token {
  authToken: string;
  refreshToken: string;
  authTokenExpiry: number;
  refreshTokenExpiry: number;
}

export interface LoginParams {
  email: string;
  password: string;
}