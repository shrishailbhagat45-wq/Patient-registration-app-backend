import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { InjectRepository } from '@nestjs/typeorm';
import { Model } from 'mongoose';
import { PrescriptionDto } from 'src/dto/prescription.dto';
import { Patient } from 'src/schema/patient.schema';
import { Prescription } from 'src/schema/prescriptions.schema';

@Injectable()
export class PrescriptionsService {
    constructor(@InjectModel('Prescription') private prescriptionModel:Model<Prescription>,@InjectModel('Patient') private patientsModel: Model<Patient>,) {
        // Initialization logic if needed
        console.log('PrescriptionService initialized');
    }
    
    async createPrescription(id,PrescriptionData: PrescriptionDto) {

        const patient = await this.patientsModel.findOne({
      where: { id },
    });
        if (!patient) {
      throw new NotFoundException('Patient not found');
    }

    const prescription = this.prescriptionModel.create({
      ...PrescriptionData,
      patient,
    });

        const data= await this.prescriptionModel.create(prescription);
        if(!data) {
            return {status: 400,message: 'Prescription Failed to create', error: 'Failed to create prescription'}
        }
        return { status: 201, message: 'Prescription created successfully', data: PrescriptionData,error: null };
    }

    async getPrescriptionsById(id) {
        const data = await this.prescriptionModel.find({
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
