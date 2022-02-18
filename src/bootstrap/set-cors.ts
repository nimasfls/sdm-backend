import { INestApplication } from '@nestjs/common';

const { SECURITY_CORS_ORIGIN } = process.env;

export const SetCors = (app: INestApplication) => {
  if (SECURITY_CORS_ORIGIN) {
    app.enableCors({
      origin: SECURITY_CORS_ORIGIN,
      credentials: true,
      allowedHeaders: ['content-type'],
      methods: ['GET', 'POST', 'OPTIONS'],
    });
  } else {
    app.enableCors({
      origin: true,
      credentials: true,
      allowedHeaders: ['content-type'],
      methods: ['GET', 'POST', 'OPTIONS'],
    });
  }
};
