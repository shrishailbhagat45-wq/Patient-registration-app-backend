import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { PatientDto } from 'src/dto/patient.dto';
import { PatientService } from './patient.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';

@Controller('patient')
export class PatientController {
    constructor(private readonly patientService: PatientService) {}

    @Post('create')
    async createPatient(@Body() patientData:PatientDto): Promise<any> {
        console.log('Received patient data:', patientData);
        const response=await this.patientService.createPatient(patientData);
        return response;
    }
    
    @Post('getPatient')
    async getPatients(@Body()name:string): Promise<any> {
        const response = await this.patientService.getPatient(name);
        return response;
    }
    @Get('/:id')
    async getSinglePatient(@Param('id') id: number): Promise<any> {
        const response = await this.patientService.getSinglePatient(id);
        return response;
    }
}
