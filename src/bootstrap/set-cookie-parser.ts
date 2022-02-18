import { INestApplication } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

export const SetCookieParser = (app: INestApplication) => {
  app.use(cookieParser());
};
