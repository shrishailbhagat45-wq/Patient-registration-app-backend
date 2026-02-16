import { Body, Controller, Get, Param, Post } from '@nestjs/common';
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
    
    @Post('addReceptionist')
    async addReceptionist(@Body() receptionistData): Promise<any> {
        const data= await this.userService.addReceptionist(receptionistData)
        console.log('Receptionist addition response:', data);
        return data;

    }
    @Get('receptionists/:id')
    async getReceptionists(@Param('id') doctorId): Promise<any> {
        const data = await this.userService.getReceptionistsByDoctorId(doctorId);
        console.log('Fetched receptionists:', data);
        return data;
    }
}
