import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';

export const SetSwagger = (app: INestApplication) => {
  createPublicDirIfNotExist();

  const { version } = JSON.parse(readFileSync('package.json', 'utf-8'));
  const options = new DocumentBuilder()
    .setTitle('Software Development Manager Project')
    .setVersion(`v${version}`)
    .addBearerAuth()
    .build();

  const appDocument = SwaggerModule.createDocument(app, options);
  writeFileSync('./dist/public/swagger.json', JSON.stringify(appDocument, null, 4));
};

const createPublicDirIfNotExist = () => {
  const publicPath = './dist/public/';

  if (!existsSync(publicPath)) {
    mkdirSync(publicPath);
  }
};
