import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { PatientQueueService } from './patient-queue.service';

@Controller('patient-queue')
export class PatientQueueController {

    constructor(private readonly patientQueueService:PatientQueueService) {}

    @Get()
    getPatientInQueue() {    
        const data= this.patientQueueService;
        return data.findAll();
    }
    @Post()
    addPatient(@Body() patient: any) {
        console.log("patient",patient);
        if(!patient) {
            throw new Error('No patient data provided');
        }
        const patientDto={name:patient.patient.name,phoneNumber:patient.patient.phoneNumber};
        console.log("patientDto",patientDto);
        return this.patientQueueService.add(patientDto);
    }

    @Delete(':id')
    deletePatient(@Param('id') id: string) {
        console.log("Deleting patient with id:", id);
        return this.patientQueueService.delete(id);
    }
}
