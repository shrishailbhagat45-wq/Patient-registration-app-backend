import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { PatientBillingService } from './patient-billing.service';
import { CreatePatientBillDto } from 'src/dto/create-patient-bill.dto';
import { UpdatePatientBillDto } from 'src/dto/update-patient-bill.dto';
@Controller('patient-bills')
export class PatientBillingController {
  constructor(private readonly patientBillService: PatientBillingService) {}

  @Post()
  create(@Body() createBillDto) {
    console.log("createDto",createBillDto);
    return this.patientBillService.create(createBillDto.billData);
  }

  @Get()
  findAll() {
    return this.patientBillService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.patientBillService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateDto: UpdatePatientBillDto) {
    return this.patientBillService.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.patientBillService.remove(id);
  }
}
