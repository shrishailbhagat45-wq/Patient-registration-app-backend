import { Body, Controller, Get, Param, Post, Put, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { GetReceptionistsDto } from 'src/dto/get-receptionists.dto';

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
    @Post('receptionists')
    async getReceptionists(@Body() body: GetReceptionistsDto): Promise<any> {
        console.log(body)
        const data = await this.userService.getReceptionistsByClinicId(body);
        return data;
    }

    @Post('addDoctor')
    async addDoctor(@Body() body): Promise<any> {
        const data= await this.userService.addDoctor(body)
        return data;

    }

    @Get('doctors/:id')
    async getDoctorByClinicId(@Param('id') id):Promise<any>{
        console.log("id is",id)
        const data= await this.userService.getDoctorByClinicId(id)
        return data
    }

    @Delete('delete/:id')
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
        console.log(passwordData)
        const data = await this.userService.updatePassword(id, passwordData);
        return data;
    }
}
