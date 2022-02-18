import { INestApplication } from '@nestjs/common';

const { SECURITY_CORS_ORIGIN } = process.env;

export const SetCors = (app: INestApplication) => {
  if (SECURITY_CORS_ORIGIN) {
    app.enableCors({
      origin: SECURITY_CORS_ORIGIN,
    });
  } else {
    app.enableCors();
  }
};
