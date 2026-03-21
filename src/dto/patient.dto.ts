import { IsString, IsOptional, IsEnum, IsNumber, IsDateString } from 'class-validator';

import { Gender } from '../schema/patient.schema';
import { Types } from 'mongoose';

export class PatientDto{

    @IsString()
    name: string;

    @IsEnum(Gender)
    gender: Gender;

    @IsDateString()
    birthday: Date;

    @IsString()
    phoneNumber: string;

    @IsNumber()
    weight: number;

    @IsString()
    doctorId: string;

    @IsOptional() @IsString() 
    bloodPressure: string;

    @IsOptional()
    @IsNumber()
    pulseRate: number;

    @IsOptional()
    @IsNumber()
    bloodSugarLevel: number;

}