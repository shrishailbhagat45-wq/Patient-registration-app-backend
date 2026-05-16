import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import * as express from 'express';

const server = express();

export const createNestApp = async () => {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));

  app.enableCors({
    origin: ['https://frontend-for-patient-registration-a.vercel.app', 'http://localhost:5173', 'http://localhost:3000','http://localhost:5174'],
    credentials: true,
  });
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT ?? 4000,'0.0.0.0',() => {
    console.log(`Server is running on port ${process.env.PORT ?? 4000}`);
  });
  await app.init();
}

createNestApp();

export default server;
