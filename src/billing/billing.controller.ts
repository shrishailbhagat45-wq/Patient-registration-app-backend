import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { BillingService } from './billing.service';
import { CreateBillingItemDto } from 'src/dto/create-billing-item.dto';
import { UpdateBillingItemDto } from 'src/dto/update-billing-item.dto';

@Controller('billing')
export class BillingController {
  constructor(private readonly billingService: BillingService) {}

  @Post()
  create(@Body() createDto: CreateBillingItemDto) {
    return this.billingService.create(createDto);
  }

  @Get()
  findAll() {
    return this.billingService.findAll();
  }

  @Get('/:id')
  findOne(@Param('id') id: number) {
    return this.billingService.findOne(id);
  }

  @Put('/:id')
  update(@Param('id') id: number, @Body() updateDto: UpdateBillingItemDto) {
    return this.billingService.update(id, updateDto);
  }

  @Delete('/:id')
  remove(@Param('id') id: number) {
    return this.billingService.remove(id);
  }
}