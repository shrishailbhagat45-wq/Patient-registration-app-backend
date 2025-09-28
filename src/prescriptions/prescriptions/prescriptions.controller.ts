import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PrescriptionsService } from './prescriptions.service';


@Controller('prescriptions')
export class PrescriptionsController {
    constructor(private readonly prescriptionsService: PrescriptionsService) {}

    @Post('/add/:id')
    async addPrescription(@Param('id') id,@Body() PrescriptionData) {
        console.log("PrescriptionData",PrescriptionData);
        const data=await this.prescriptionsService.createPrescription(id,PrescriptionData);
        return data;
    }
    @Get('/patient/:id')
    async getPrescriptionsByPatientId(@Param('id') id) {
        const data=await this.prescriptionsService.getPrescriptionsByPatientId(id);
        console.log("data",data);
        return data;
    }

    @Get('/:id')
    async getPrescriptionByIdWithPatientData(@Param('id') id) {
        const data=await this.prescriptionsService.getPrescriptionsByIdWithPatientData(id);
        return data;
    }   
}
