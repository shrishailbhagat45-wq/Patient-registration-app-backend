import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePatientBillDto {
  @IsString()
  @IsNotEmpty()
  patient: string;

  @IsArray()
  items: { item: string; quantity: number }[];

  @IsNumber()
  @IsNotEmpty()
  totalAmount: number; // can also calculate in service
}