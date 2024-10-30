import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import type { INestApplication } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import * as process from 'process';

export const DashboardDomain = 'community.lyttledevelopment.com';
export const DashboardURL = `https://${DashboardDomain}`;

async function bootstrap(): Promise<void> {
  const app: INestApplication = await NestFactory.create(AppModule);

  if (process.env.NODE_ENV === 'development') {
    app.enableCors({
      origin: 'http://localhost:8080',
      credentials: true,
    });
  } else {
    app.enableCors({
      origin: DashboardURL,
      credentials: true,
    });
  }

  app.use(cookieParser());

  await app.listen(process.env.PORT);
}

void bootstrap();
