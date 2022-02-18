import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { OptionalGuard } from '../guards/optional.guard';
import { IS_AUTH_OPTIONAL, PERMISSION_METADATA_TAG } from '../../../base/constants';

export const OptionalAuth = () => {
  return applyDecorators(
    ApiBearerAuth(),
    SetMetadata(PERMISSION_METADATA_TAG, []),
    SetMetadata(IS_AUTH_OPTIONAL, true),
    UseGuards(OptionalGuard),
  );
};
