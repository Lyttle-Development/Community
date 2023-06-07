import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import type { INestApplication } from '@nestjs/common';
import { environment } from '../utils';
import cookieParser from 'cookie-parser';

async function bootstrap(): Promise<void> {
  const app: INestApplication = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:8080',
    credentials: true,
  });
  app.use(cookieParser());

  await app.listen(environment.PORT);
}

void bootstrap();
