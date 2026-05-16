import { Body, Controller, Delete, Get, Param, Post,Headers } from '@nestjs/common';
import { PatientQueueService } from './patient-queue.service';

@Controller('patient-queue')
export class PatientQueueController {

    constructor(private readonly patientQueueService:PatientQueueService) {}

    @Get()
    getPatientInQueue(@Headers('doctorId') doctorId: string) {    
        const data= this.patientQueueService;
        return data.findAll(doctorId); // Replace 'doctorId' with actual doctor ID as needed
    }
    @Post()
    addPatient(@Body() patient: any) {
        console.log("patient",patient);
        if(!patient) {
            throw new Error('No patient data provided');
        }
        console.log("patientDto",patient);
        return this.patientQueueService.add(patient);
    }

    @Delete(':id')
    deletePatient(@Param('id') id: string) {
        console.log("Deleting patient with id:", id);
        return this.patientQueueService.delete(id);
    }
}
