import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as basicAuth from 'express-basic-auth';
import { join } from 'path';
import { AppModule } from './app.module';

function authorizeFunc(username: string, password: string, cb) {
  if (process.env.MODE === "DEV") cb(null, true);

  const {SWAGGER_USER:user, SWAGGER_PASSWORD:pwd} = process.env;
  const isOk = username === user && password === pwd;
  return cb(null, isOk);


}

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.use(
    ['/docs', '/docs-json'],
    basicAuth({
      authorizer: authorizeFunc,
      challenge: true,
      authorizeAsync: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Minecraft server')
    .setDescription('Backend-service')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  app.enableCors();

  app.useStaticAssets(join(__dirname, '..', 'static'), {
    prefix: '/static/',
  });

  await app.listen(process.env.APP_PORT);
}
bootstrap();
