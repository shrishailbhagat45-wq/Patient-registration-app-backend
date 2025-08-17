import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PatientDto } from 'src/dto/patient.dto';
import { PatientEntity } from 'src/entities/patient.entity';
import { Like, Repository } from 'typeorm';


@Injectable()
export class PatientService {
    constructor(@InjectRepository(PatientEntity) private patientRepository: Repository<PatientEntity>) {
        // Initialization logic if needed
        console.log('PatientService initialized');
    }
    // Define methods for handling patient-related operations here
    async createPatient(patientData: PatientDto): Promise<any> {
        // Logic to create a new patient
        try {
            const data=await this.patientRepository.save(patientData);
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
        const data = await this.patientRepository.find({
            where: { name: Like(`%${search.name}%`) }
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
    updatePatient(id: number, patientData: any): string {
        // Logic to update an existing patient
        return `Patient with ID ${id} updated successfully`;
    }
    deletePatient(id: number): string {
        // Logic to delete a patient`
        return `Patient with ID ${id} deleted successfully`;
    }
}
