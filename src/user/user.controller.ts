import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService:UserService) {}
    @Post('create')
    async createUser(@Body() userData): Promise<any> {
        const data= await this.userService.createUser(userData)
        console.log('User creation response:', data);
        
        return data;
    }
}
