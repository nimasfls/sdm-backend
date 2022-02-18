import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import JwtRefreshGuard from '../guards/refresh.guard';

export const RefreshAuth = () => {
  return applyDecorators(UseGuards(AuthGuard('jwt-refresh-token'), JwtRefreshGuard));
};
