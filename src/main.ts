import './bootstrap/set-environment';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SetCors } from './bootstrap/set-cors';
import { SetHelmet } from './bootstrap/set-helmet';
import { SetSwagger } from './bootstrap/set-swagger';
import { SetCookieParser } from './bootstrap/set-cookie-parser';
const { PORT } = process.env;

(async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  SetCookieParser(app);
  SetCors(app);
  SetHelmet(app);
  SetSwagger(app);

  await app.listen(Number(PORT) || 3000);
})();
