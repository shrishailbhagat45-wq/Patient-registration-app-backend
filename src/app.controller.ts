import { Body, Controller, Get, Post } from '@nestjs/common';
    

@Controller()
export class AppController {

    @Get()
  getHello(): string {
    return 'Hello from NestJS on Vercel!';
  }
}
