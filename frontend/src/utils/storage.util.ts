export enum TokenType {
  TOKEN = 'token',
  REFRESH_TOKEN = 'refresh_token',
}

export const storage = {
  getToken: () => JSON.parse(window.localStorage.getItem('token')!),
  setToken: (token: string, tokenType: TokenType) =>
    window.localStorage.setItem(tokenType, JSON.stringify(token)),
  clearToken: () => window.localStorage.removeItem('token'),
};
