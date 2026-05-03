import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ClinicService } from './clinic.service';

@Controller('clinic')
export class ClinicController {
    constructor(private readonly clinicService: ClinicService) {}
    @Post('create')
    async createClinic(@Body() clinicData): Promise<any> {
        console.log('Received clinic data:', clinicData);
        const response = await this.clinicService.createClinic(clinicData);
        return response;
    }
}