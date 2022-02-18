import { applyDecorators, ClassSerializerInterceptor, Controller, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

export const BusinessController = (route?: string, name?: string) => {
  return applyDecorators(
    ApiBearerAuth(),
    UseInterceptors(ClassSerializerInterceptor),
    ApiTags(name || ''),
    Controller(route || ''),
  );
};
