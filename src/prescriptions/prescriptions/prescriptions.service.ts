import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { InjectRepository } from '@nestjs/typeorm';
import { Model, Types } from 'mongoose';
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
        try {
        const patient = await this.patientsModel.findById(id);
        if (!patient) {
            throw new NotFoundException('Patient not found');
        }
        const prescription = { ...PrescriptionData, patient: patient._id, patientName: patient.name };
        const data = await this.prescriptionModel.create(prescription);
        if(!data) {
            return {status: 400,message: 'Prescription Failed to create', error: 'Failed to create prescription'}
        }
        return { status: 201, message: 'Prescription created successfully', data: PrescriptionData,error: null };
    } catch (error) {
        throw new NotFoundException('Patient not found or prescription creation failed');
    }
    }

    async getPrescriptionsById(id:string) {
        const data = await this.prescriptionModel.find({
        patient: new Types.ObjectId(id),
    })
    .sort({ createdAt: -1 }) //sort by newest
    .limit(3)                //get only 5 results
    .exec();
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
