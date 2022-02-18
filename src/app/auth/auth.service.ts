import { Injectable } from '@nestjs/common';
import { JwtPayload } from './types/jwt-payload';
import { JwtService } from '@nestjs/jwt';
import { JwtExpireDuration, JwtRefreshExpireDuration, JwtRefreshTokenSecret, JwtSecret } from '../../config/jwt.config';
import { Request } from 'express';
import { LoginRequestDto } from './dto/request/login.request.dto';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async refreshToken(req: Request, user: any) {
    const accessTokenCookie = await this.getCookieWithJwtAccessToken(user.id);
    const refreshTokenCookie = await this.getCookieWithJwtRefreshToken(user.id);
    return { accessTokenCookie, refreshTokenCookie };
  }

  private async getCookieWithJwtAccessToken(id: number) {
    const payload: JwtPayload = { id };
    const token = this.jwtService.sign(payload, {
      secret: JwtSecret,
      expiresIn: JwtExpireDuration,
    });
    const cookie = `accessToken=${token}; HttpOnly; Path=/; Max-Age=${JwtExpireDuration}; SameSite=None; Secure`;
    return {
      cookie,
      token,
    };
  }

  private async getCookieWithJwtRefreshToken(id: number) {
    const payload: JwtPayload = { id };
    const token = this.jwtService.sign(payload, {
      secret: JwtRefreshTokenSecret,
      expiresIn: JwtRefreshExpireDuration,
    });
    const cookie = `refreshToken=${token}; HttpOnly; Path=/; Max-Age=${JwtRefreshExpireDuration}; SameSite=None; Secure`;
    return {
      cookie,
      token,
    };
  }

  private getCookiesForLogOut() {
    return ['accessToken=; HttpOnly; Path=/; Max-Age=0', 'refreshToken=; HttpOnly; Path=/; Max-Age=0'];
  }

  async logout(request: Request) {
    request.res.setHeader('Set-Cookie', this.getCookiesForLogOut());
  }

  async login(dto: LoginRequestDto, request: Request) {
    const user = { id: 1234567 };
    const accessTokenCookie = await this.getCookieWithJwtAccessToken(user.id);
    const refreshTokenCookie = await this.getCookieWithJwtRefreshToken(user.id);
    request.res.setHeader('Set-Cookie', [accessTokenCookie.cookie, refreshTokenCookie.cookie]);
    return user;
  }
}
