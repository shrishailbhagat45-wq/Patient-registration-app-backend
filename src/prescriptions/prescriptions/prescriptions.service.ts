import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PrescriptionDto } from 'src/dto/prescription.dto';
import { PatientEntity } from 'src/entities/patient.entity';
import { PrescriptionEntity } from 'src/entities/prescriptions.entity';
import { Repository } from 'typeorm';
@Injectable()
export class PrescriptionsService {
    constructor(@InjectRepository(PrescriptionEntity) private prescriptionRepository:Repository<PrescriptionEntity>,@InjectRepository(PatientEntity) private patientsRepository: Repository<PatientEntity>,) {}
    
    async createPrescription(id,PrescriptionData: PrescriptionDto) {

        const patient = await this.patientsRepository.findOne({
      where: { id },
    });
        if (!patient) {
      throw new NotFoundException('Patient not found');
    }

    const prescription = this.prescriptionRepository.create({
      ...PrescriptionData,
      patient,
    });

        const data= await this.prescriptionRepository.save(prescription);
        if(!data) {
            return {status: 400,message: 'Prescription Failed to create', error: 'Failed to create prescription'}
        }
        return { status: 201, message: 'Prescription created successfully', data: PrescriptionData,error: null };
    }

    async getPrescriptionsById(id) {
        const data = await this.prescriptionRepository.find({
            where: { patient: { id } },
            relations: ['patient'],
        }); 
        if (data.length === 0) {
            return {
                status: 404,
                message: 'No prescriptions found for this patient', 
                data: [],
                error: null
            };
        }   
        return {
            status: 200,
            message: 'Prescriptions retrieved successfully',
            data: data, 
            error: null
        };
    }
}
