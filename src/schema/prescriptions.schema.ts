import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Patient } from './patient.schema';

export type PrescriptionDocument = Prescription & Document;

class Drug {
  @Prop({ required: true  })
  name: string;

  @Prop({ required: true })
  strength: string;

  @Prop({ required: true })
  quantity: string;

  @Prop({ required: true })
  frequency: string;
}

@Schema({ timestamps: true, autoIndex: true }) 
export class Prescription {
  @Prop({ type: [Drug], required: true })
  drug: Drug[];

  @Prop()
  remarks?: string;

  
  @Prop({ type: Types.ObjectId, required: true,ref:Patient.name,trim: true ,index: true })
  patient: Types.ObjectId;

  @Prop({ required: true })
  patientName: string;

  @Prop({ default: false })
  delete_status?: boolean;

  @Prop({ type: Date, default: null })
  deletedAt?: Date;
}

export const PrescriptionSchema = SchemaFactory.createForClass(Prescription);
