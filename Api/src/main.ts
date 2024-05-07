import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import type { INestApplication } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import * as process from 'process';

async function bootstrap(): Promise<void> {
  const app: INestApplication = await NestFactory.create(AppModule);

  if (process.env.NODE_ENV === 'development') {
    app.enableCors({
      origin: 'http://localhost:8080',
      credentials: true,
    });
  } else {
    app.enableCors({
      origin: 'https://community.lyttledevelopment.com',
      credentials: true,
    });
  }

  app.use(cookieParser());

  await app.listen(process.env.PORT);
}

void bootstrap();
