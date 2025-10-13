import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PatientBill, PatientBillDocument } from 'src/schema/patientBill.schema';
import { CreatePatientBillDto } from 'src/dto/create-patient-bill.dto';
import { UpdatePatientBillDto } from 'src/dto/update-patient-bill.dto';

@Injectable()
export class PatientBillingService {
  constructor(
    @InjectModel(PatientBill.name) private patientBillModel: Model<PatientBillDocument>,
  ) {}

  async create(createDto: CreatePatientBillDto): Promise<PatientBill> {
    const newBill = new this.patientBillModel(createDto);
    return newBill.save();
  }

  async findAll(): Promise<PatientBill[]> {
    return this.patientBillModel.find().populate('items.item').exec();
  }

  async findOne(id: string): Promise<PatientBill> {
    const bill = await this.patientBillModel.findById(id).populate('items.item').exec();
    if (!bill) throw new NotFoundException(`Bill with ID ${id} not found`);
    return bill;
  }

  async update(id: string, updateDto: UpdatePatientBillDto): Promise<PatientBill> {
    const updated = await this.patientBillModel
      .findByIdAndUpdate(id, updateDto, { new: true })
      .populate('items.item')
      .exec();
    if (!updated) throw new NotFoundException(`Bill with ID ${id} not found`);
    return updated;
  }

  async remove(id: string): Promise<void> {
    const result = await this.patientBillModel.findByIdAndDelete(id).exec();
    if (!result) throw new NotFoundException(`Bill with ID ${id} not found`);
  }
}

