import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { PatientBill } from 'src/schema/patientBill.schema';
import { CreatePatientBillDto } from 'src/dto/create-patient-bill.dto';
import { UpdatePatientBillDto } from 'src/dto/update-patient-bill.dto';

@Injectable()
export class PatientBillingService {
  constructor(
    @InjectModel('PatientBill') private patientBillModel: Model<PatientBill>,
  ) {}

  async create(createBillDto: CreatePatientBillDto): Promise<PatientBill> {
    // log incoming DTO to verify values
    console.log('createDto', createBillDto);

    // basic validation so Mongoose validation errors are clearer
    if (!createBillDto || !createBillDto.patientId) {
      throw new BadRequestException('patientId is required');
    }
    if (createBillDto.totalAmount === undefined || createBillDto.totalAmount === null) {
      throw new BadRequestException('totalAmount is required');
    }

    // cast patientId to ObjectId if it's a valid hex string
    let patientId: any = createBillDto.patientId;
    if (typeof patientId === 'string' && Types.ObjectId.isValid(patientId)) {
      patientId = new Types.ObjectId(patientId);
    }

    const payload = { ...createBillDto, patientId };

    try {
      const newBill = new this.patientBillModel(payload);
      return await newBill.save();
    } catch (error) {
      console.error('Error saving PatientBill:', error);
      throw error;
    }
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

