import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BillingItem, BillingItemDocument } from 'src/schema/billingItem.schema';
import { CreateBillingItemDto } from 'src/dto/create-billing-item.dto';
import { UpdateBillingItemDto } from 'src/dto/update-billing-item.dto';

import { error } from 'console';

@Injectable()
export class BillingService {
  constructor(
    @InjectModel(BillingItem.name) private billingModel: Model<BillingItemDocument>,
  ) {}

  async create(createDto: CreateBillingItemDto) {
    const existingItem = await this.billingModel.findOne({ name: createDto.name }).exec();
    if (existingItem) {
        throw new BadRequestException('Billing item failed to create: item already exists');
    }
    const data =await this.billingModel.create(createDto);
    return { status: 201, message:"Item is crated",data:data ,error: ""}
  }

  async findAll(): Promise<BillingItem[]> {
    return this.billingModel.find().exec();
  }

  async findOne(id: number): Promise<BillingItem> {
    const item = await this.billingModel.findById(id).exec();
    if (!item) throw new NotFoundException(`Billing item with ID ${id} not found`);
    return item;
  }

  async update(id:number, updateDto: UpdateBillingItemDto) {
    const updated = await this.billingModel.findByIdAndUpdate(id, updateDto, {
      new: true,
    }).exec();
    if (!updated) throw new NotFoundException(`Billing item with ID ${id} not found`);
    return { status: 200, message:"Item is updated",data:updated ,error: ""};
  }

  async remove(id:number): Promise<void> {
    const result = await this.billingModel.findByIdAndDelete(id).exec();
    if (!result) throw new NotFoundException(`Billing item with ID ${id} not found`);
  }
}