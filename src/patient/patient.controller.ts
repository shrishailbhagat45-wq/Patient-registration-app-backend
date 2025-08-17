import { Body, Controller, Get, Post } from '@nestjs/common';
import { PatientDto } from 'src/dto/patient.dto';
import { PatientService } from './patient.service';
import { PatientEntity } from 'src/entities/patient.entity';    

@Controller('patient')
export class PatientController {
    constructor(private readonly patientService: PatientService) {}

    @Post('create')
    async createPatient(@Body() patientData): Promise<any> {
        console.log('Creating patient with data:', patientData);
        const response=await this.patientService.createPatient(patientData);
        console.log('Patient created successfully:', response);
        return response;
    }
    @Post('getPatient')
    async getPatients(@Body()name): Promise<any> {
        console.log(name);
        const response = await this.patientService.getPatient(name);
        return response;
    }
}
