import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
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
    @Get('delete/:id')
    async deleteUser(@Param('id') id): Promise<any> {
        const data = await this.userService.deleteUser(id);
        return data;
    }
    @Get('/:id')
    async getUserById(@Param('id') id): Promise<any> {
        const data = await this.userService.findOne(id);
        return data;
    }
    @Put('/:id')
    async updateUser(@Param('id') id, @Body() updateData): Promise<any> {
        const data = await this.userService.updateUser(id, updateData);
        return data;
    }

    @Put('/password/:id')
    async updatePassword(@Param('id') id, @Body() passwordData): Promise<any> {
        const data = await this.userService.updatePassword(id, passwordData);
        return data;
    }
}
