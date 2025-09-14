import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PrescriptionsService } from './prescriptions.service';


@Controller('prescriptions')
export class PrescriptionsController {
    constructor(private readonly prescriptionsService: PrescriptionsService) {}

    @Post('/add/:id')
    addPrescription(@Param('id') id,@Body() PrescriptionData) {
        const data=this.prescriptionsService.createPrescription(id,PrescriptionData);
        return data;
    }
    @Get('/:id')
    getPrescriptions(@Param('id') id) {
        const data=this.prescriptionsService.getPrescriptionsById(id);
        return data;
    }
}
