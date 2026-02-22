import { IsString, IsOptional, IsEnum, IsNumber } from 'class-validator';

import { Gender } from '../schema/patient.schema';
import { Types } from 'mongoose';

export class PatientDto{

    @IsString()
    name: string;

    @IsEnum(Gender)
    gender: Gender;

    @IsNumber()
    age: number;

    @IsString()
    phoneNumber: string;

    @IsNumber()
    weight: number;

    @IsString()
    doctorId: string;

}