import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PatientDto } from 'src/dto/patient.dto';
import { Patient } from 'src/schema/patient.schema';


@Injectable()
export class PatientService {
    constructor(@InjectModel('Patient') private patientModel:Model<Patient>) {
        // Initialization logic if needed
        console.log('PatientService initialized');
    }
    // Define methods for handling patient-related operations here
    async createPatient(patientData: PatientDto): Promise<any> {
        // Logic to create a new patient
        try {
            const data=await this.patientModel.create(patientData);
            if(!data) {
                return {status: HttpStatus.BAD_REQUEST,message: 'Patient Failed to create', error: 'Failed to create patient'}
            }
            return { status: HttpStatus.CREATED, message: 'Patient created successfully', data: patientData,error: null };
        }catch (error) {
            throw new HttpException({status: HttpStatus.INTERNAL_SERVER_ERROR,error: 'Something went wrong'}, HttpStatus.INTERNAL_SERVER_ERROR, {cause: error});
        }
    }
    async getPatient(search) {
        console.log('Searching for patients with name:', search.name);
        try {
            const data = await this.patientModel.find({
                        name: { $regex: search.name, $options: 'i' }
                        });
            console.log('Data retrieved from database:', data);
            if (data.length === 0) {
                return {
                    status: HttpStatus.NOT_FOUND,
                    message: 'No patients found',
                    data: [],
                    error: null
                };
            }
            return {
                status: HttpStatus.OK,
                message: 'Patients retrieved successfully',
                data: data,
                error: null
            };
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Something went wrong'
            }, HttpStatus.INTERNAL_SERVER_ERROR, { cause: error });
        }
    }
    async getSinglePatient(id: number): Promise<any> {
        try {
            const data = await this.patientModel.findById(id);
            if (!data) {
                return {
                    status: HttpStatus.NOT_FOUND,
                    message: 'Patient not found',
                    data: null,
                    error: 'No patient found with the given ID'
                };
            }       
            return {
                status: HttpStatus.OK,
                message: 'Patient retrieved successfully',
                data: data,
                error: null
            };
        } catch (error) {
            throw new HttpException({   
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Something went wrong'
            }, HttpStatus.INTERNAL_SERVER_ERROR, { cause: error });
        }
    }


    updatePatient(id: number, patientData: any): string {
        // Logic to update an existing patient
        return `Patient with ID ${id} updated successfully`;
    }
    deletePatient(id: number): string {
        // Logic to delete a patient`
        return `Patient with ID ${id} deleted successfully`;
    }
}
