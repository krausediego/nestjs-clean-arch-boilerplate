export type IJwtPayload = Record<string, any>;

export interface IJwtService {
  createToken(
    payload: IJwtPayload,
    secret: string,
    expiresIn?: string | number,
  ): string;
  checkToken(token: string): Promise<any>;
}
