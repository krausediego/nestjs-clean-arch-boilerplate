export interface ITokenCache {
  setToken(id: string, expiration: number, token: string): Promise<void>;
  getToken(id: string): Promise<string>;
  deleteToken(id: string): Promise<void>;
}
