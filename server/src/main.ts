import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import * as dotenv from 'dotenv';

dotenv.config();
const { PORT = 3000, NODE_ENV } = process.env;

(async function () {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.enableCors({
    origin: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: [
      'X-Requested-With,Content-Type',
      'Access-Control-Allow-Origin',
      'Origin',
    ],
    credentials: true,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      enableDebugMessages: NODE_ENV === 'development',
    }),
  );
  await app.listen(PORT);
})();
