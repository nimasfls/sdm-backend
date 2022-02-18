import { INestApplication } from '@nestjs/common';
import helmet from 'helmet';

export const SetHelmet = (app: INestApplication) => {
  app.use(helmet());
};
