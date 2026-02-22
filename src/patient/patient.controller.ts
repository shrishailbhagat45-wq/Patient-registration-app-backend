import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { PatientDto } from 'src/dto/patient.dto';
import { PatientService } from './patient.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';
import { Roles } from 'src/auth/decorators/Role.decorator';
import { Role } from 'src/schema/user.schema';
import { RolesGuard } from 'src/auth/guards/roles/roles.guard';

@UseGuards(JwtAuthGuard)
@Controller('patient')
export class PatientController {
    constructor(private readonly patientService: PatientService) {}

    @Post('create')
    async createPatient(@Body() patientData: PatientDto): Promise<any> {
        console.log('Received patient data:', patientData);
        const response = await this.patientService.createPatient(patientData);
        return response;
    }
    
    @Post('getPatient')
    async getPatients(@Body() name: string): Promise<any> {
        const response = await this.patientService.getPatient(name);
        return response;
    }
    @Roles([Role.ADMIN,Role.DOCTOR])
    @UseGuards(RolesGuard)
    @Get('/:id')
    async getSinglePatient(@Param('id') id: number): Promise<any> {
        const response = await this.patientService.getSinglePatient(id);
        return response;
    }
}
