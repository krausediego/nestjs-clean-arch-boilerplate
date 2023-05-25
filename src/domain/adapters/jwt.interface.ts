export type IJwtPayload = Record<string, any>;

export interface IJwtService {
  createToken(payload: IJwtPayload, secret: string): string;
  checkToken(token: string): Promise<any>;
}
