import { IsString, IsOptional, IsEnum, IsNumber } from 'class-validator';

import { Gender } from '../entities/patient.entity';

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


}