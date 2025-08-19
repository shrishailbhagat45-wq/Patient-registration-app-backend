import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import * as express from 'express';

const server = express();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));

  app.enableCors({
    origin: ['https://your-frontend.vercel.app', 'http://localhost:3000'],
    credentials: true,
  });
  app.useGlobalPipes(new ValidationPipe());
  await app.init();
}

bootstrap();

export default server;
