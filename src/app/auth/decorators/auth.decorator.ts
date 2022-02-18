import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../guards/role.guard';
import { PERMISSION_METADATA_TAG } from '../../../base/constants';

export const Auth = (...permissions: any[]) => {
  return applyDecorators(SetMetadata(PERMISSION_METADATA_TAG, permissions), UseGuards(AuthGuard('jwt'), RolesGuard));
};
