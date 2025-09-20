import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';


export type PatientDocument = Patient & Document;

export enum Gender {
  Male = 'Male',
  Female = 'Female',
  Other = 'Other'
}

@Schema({ timestamps: true })
export class Patient {
  @Prop({ required: true })
  name: string;

  @Prop({ type: String, enum: Gender, required: true })
  gender: Gender;

  @Prop({ required: true})
  age: number;

  @Prop({ required: true,unique: true  })
  phoneNumber: string;

  @Prop({ required: true })
  weight: number;

  @Prop({ default: false })
  delete_status?: boolean;

  @Prop({ type: Date, default: null })
  deletedAt?: Date;
}

export const PatientSchema = SchemaFactory.createForClass(Patient);



