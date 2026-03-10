import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { PatientBill } from 'src/schema/patientBill.schema';
import { CreatePatientBillDto } from 'src/dto/create-patient-bill.dto';
import { UpdatePatientBillDto } from 'src/dto/update-patient-bill.dto';
import { PatientBillingFilterDto } from 'src/dto/patient-billing-filter.dto';

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

  async findAll(filter: PatientBillingFilterDto): Promise<PatientBill[]> {
    const query: any = {};

    if (filter?.doctorId) {
      query.doctorId = filter.doctorId;
    }

    if (filter?.date) {
      const inputDate = new Date(filter.date);
      if (Number.isNaN(inputDate.getTime())) {
        throw new BadRequestException('date must be a valid date');
      }

      const startOfDay = new Date(inputDate);
      startOfDay.setHours(0, 0, 0, 0);

      const endOfDay = new Date(inputDate);
      endOfDay.setHours(23, 59, 59, 999);

      query.createdAt = {
        $gte: startOfDay,
        $lte: endOfDay,
      };
    }

    if (filter?.month) {
      const monthText = filter.month.trim();
      const yearMonthRegex = /^(\d{4})-(\d{2})$/;
      const yearMonthMatch = monthText.match(yearMonthRegex);

      if (!yearMonthMatch) {
        throw new BadRequestException('month must be in format "YYYY-MM" (e.g. "2026-03")');
      }

      const year = Number(yearMonthMatch[1]);
      const monthNumber = Number(yearMonthMatch[2]);
      const monthIndex = monthNumber - 1;

      if (!Number.isInteger(monthNumber) || monthNumber < 1 || monthNumber > 12) {
        throw new BadRequestException('month must be a valid month between 01 and 12');
      }

      const startOfMonth = new Date(year, monthIndex, 1, 0, 0, 0, 0);
      const endOfMonth = new Date(year, monthIndex + 1, 0, 23, 59, 59, 999);

      query.createdAt = {
        $gte: startOfMonth,
        $lte: endOfMonth,
      };
    }

    return this.patientBillModel.find(query).populate('items.item').exec();
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

