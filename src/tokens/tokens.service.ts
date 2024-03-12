import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'src/infrastructure/types/jwt/jwtPayload';

@Injectable()
export class TokensService {
  constructor(private jwtService: JwtService) {}

  generateRefreshToken(payload: JwtPayload) {
    return this.jwtService.signAsync(payload, {
      expiresIn: '30d',
      secret: process.env.JWT_REFRESH_KEY_SECRET,
    });
  }

  generateAcessToken(payload: JwtPayload) {
    return this.jwtService.signAsync(payload, {
      expiresIn: '30m',
      secret: process.env.JWT_ACCESS_KEY_SECRET,
    });
  }

  validateAccessToken(token: string) {
    return this.jwtService.verify(token, {
      secret: process.env.JWT_ACCESS_KEY_SECRET,
    });
  }

  validateRefreshToken(token: string) {
    return this.jwtService.verify(token, {
      secret: process.env.JWT_REFRESH_KEY_SECRET,
    });
  }

  async generateTokensPair(
    payload: JwtPayload,
  ): Promise<{ access: string; refresh: string }> {
    const access = await this.generateAcessToken(payload);
    const refresh = await this.generateRefreshToken(payload);

    return {
      access,
      refresh,
    };
  }
}
