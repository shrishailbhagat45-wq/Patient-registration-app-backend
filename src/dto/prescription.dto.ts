import { IsString } from "class-validator";

export class PrescriptionDto{
    @IsString()
    name: string;
    @IsString()
    strength: string;
    @IsString()   
    quantity: string;
    @IsString()
    frequency: string;
    @IsString()
    remarks: string;
}