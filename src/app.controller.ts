import { Body, Controller, Get, Post } from '@nestjs/common';
    

@Controller()
export class AppController {

    @Get()
  getHello(): object {
    return {"message": "Welcome to the Patient Registration API", "status": 200};
  }
}
