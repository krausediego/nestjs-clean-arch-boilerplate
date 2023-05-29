import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IJwtService, IJwtPayload } from 'src/domain/adapters/jwt.interface';

@Injectable()
export class JwtTokenService implements IJwtService {
  constructor(private readonly jwtService: JwtService) {}

  async checkToken(token: string): Promise<any> {
    const decode = await this.jwtService.verifyAsync(token);
    return decode;
  }

  createToken(
    payload: IJwtPayload,
    secret: string,
    expiresIn: string | number,
  ): string {
    return this.jwtService.sign(payload, { secret, expiresIn });
  }
}
