import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PatientDto } from 'src/dto/patient.dto';
import { UpdatePatientDto } from 'src/dto/update-patient.dto';
import { Patient } from 'src/schema/patient.schema';


@Injectable()
export class PatientService {
    constructor(@InjectModel('Patient') private patientModel:Model<Patient>) {
        // Initialization logic if needed
        console.log('PatientService initialized');
    }
    async createPatient(patientData: PatientDto): Promise<any> {
        // Logic to create a new patient
        try {
            const checkPhoneNumberIsPresent = await this.patientModel.findOne({ 
                phoneNumber: patientData.phoneNumber,
                doctorId: patientData.doctorId
            });

            if (checkPhoneNumberIsPresent) {
                return {
                    status: HttpStatus.CONFLICT,
                    message: 'Phone number already exists for this doctor',
                    error: 'Phone number already in use for this doctor'
                };
            }

            const newPatient = new this.patientModel(patientData);
            const data = await newPatient.save();

            if (!data) {
                return {
                    status: HttpStatus.BAD_REQUEST,
                    message: 'Patient Failed to create',
                    error: 'Failed to create patient'
                };
            }
            return {
                status: HttpStatus.CREATED,
                message: 'Patient created successfully',
                data: data,
                error: null
            };
        } catch (error) {
            console.error('Error creating patient:', error);
            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Something went wrong'
            }, HttpStatus.INTERNAL_SERVER_ERROR, { cause: error });
        }
    }

    async getPatient(search) {

        try {
            const query: any = {};
            
            // Add name search if provided
            if (search.name) {
                query.name = { $regex: search.name, $options: 'i' };
            }
              // Add doctorId filter if provided
            if (search.doctorId) {
                query.doctorId = search.doctorId;
            }
            
            const data = await this.patientModel.find(query)
                .limit(5)
                .exec();
            
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
            console.error('Error retrieving patients:', error);
            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: error.message || 'Something went wrong'
            }, HttpStatus.INTERNAL_SERVER_ERROR);
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
            console.log('Retrieving patient with ID:', data);
             
            return {
                status: HttpStatus.OK,
                message: 'Patient retrieved successfully',
                data: data,
                error: null
            };
        } catch (error) {
            console.error('Error retrieving patient:', error);
            throw new HttpException({   
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: error.message || 'Something went wrong'
            }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    async updatePatient(id: string, updatePatientData: UpdatePatientDto): Promise<any> {
        // Logic to update an existing patient
        try {
            const patient = await this.patientModel.findById(id);
            
            if (!patient) {
                return {
                    status: HttpStatus.NOT_FOUND,
                    message: 'Patient not found',
                    data: null,
                    error: 'No patient found with the given ID'
                };
            }

            // If phoneNumber is being updated, check for duplicates
            if (updatePatientData.phoneNumber && updatePatientData.phoneNumber !== patient.phoneNumber) {
                const existingPatient = await this.patientModel.findOne({
                    phoneNumber: updatePatientData.phoneNumber,
                    doctorId: patient.doctorId,
                    _id: { $ne: id }
                });

                if (existingPatient) {
                    return {
                        status: HttpStatus.CONFLICT,
                        message: 'Phone number already exists for this doctor',
                        error: 'Phone number already in use for this doctor'
                    };
                }
            }

            const updatedPatient = await this.patientModel.findByIdAndUpdate(
                id,
                updatePatientData,
                { new: true, runValidators: true }
            );

            if (!updatedPatient) {
                return {
                    status: HttpStatus.BAD_REQUEST,
                    message: 'Patient failed to update',
                    error: 'Failed to update patient'
                };
            }

            return {
                status: HttpStatus.OK,
                message: 'Patient updated successfully',
                data: updatedPatient,
                error: null
            };
        } catch (error) {
            console.error('Error updating patient:', error);
            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Something went wrong'
            }, HttpStatus.INTERNAL_SERVER_ERROR, { cause: error });
        }
    }
    deletePatient(id: number): string {
        // Logic to delete a patient
        return `Patient with ID ${id} deleted successfully`;
    }
}
