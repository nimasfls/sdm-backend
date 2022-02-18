import { Body, Controller, Get, HttpCode, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RefreshAuth } from './decorators/refresh-auth.decorator';
import { GetUser } from './decorators/get-user.decorator';
import { Request } from 'express';
import { Auth } from './decorators/auth.decorator';
import { LoginRequestDto } from './dto/request/login.request.dto';
import { LoginResponseDto } from './dto/response/login.response.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async loginByPhoneNumberPanel(@Body() dto: LoginRequestDto, @Req() request: Request) {
    const user = await this.authService.login(dto, request);
    return new LoginResponseDto(user);
  }

  @RefreshAuth()
  @HttpCode(200)
  @Get('/refresh')
  async refresh(@Req() req: Request, @GetUser() user: any) {
    const { refreshTokenCookie, accessTokenCookie } = await this.authService.refreshToken(req, { id: 123321 });
    req.res.setHeader('Set-Cookie', [accessTokenCookie.cookie, refreshTokenCookie.cookie]);
  }

  @Auth(['test'])
  @Get('/access')
  async access() {
    return { hello: 'access1' };
  }

  @Get('/test')
  async test() {
    return { hello: 'world1' };
  }
}
