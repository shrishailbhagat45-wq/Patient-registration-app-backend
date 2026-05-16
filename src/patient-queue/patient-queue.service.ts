import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { PatientQueue } from 'src/schema/patientQueue';

@Injectable()
export class PatientQueueService {
    constructor(@InjectModel('PatientQueue') private readonly patientQueueModel: Model<PatientQueue>,
    ) {}

    async findAll(doctorId: string) {
        const doctorObjectId =new Types.ObjectId(doctorId); // Assuming doctorId is already a string, convert to ObjectId if needed
        return this.patientQueueModel.find({ doctorId: doctorObjectId }).exec();
    }

    async add(patientDto: any) {
        if (!patientDto?.name) throw new BadRequestException('Name is required');

        const existing = await this.patientQueueModel.findOne({ name: patientDto.name }).exec();

        if (!existing) {
            const created = new this.patientQueueModel(patientDto);
            return created.save();
        }
        else {
            if (existing.phoneNumber === patientDto.phoneNumber ) {
                throw new ConflictException('Patient with same name and mobile already exists in queue');
            }
            const created = new this.patientQueueModel(patientDto);
            return created.save();
        }
    }

    async delete(id: string) {
        if (!id) throw new BadRequestException('ID is required for delete');

        const deleted = await this.patientQueueModel.findByIdAndDelete(id).exec();
        if (!deleted) throw new NotFoundException('Patient not found in queue');

        return deleted;
    }
}
