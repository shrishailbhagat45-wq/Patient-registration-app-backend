import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type PrescriptionDocument = Prescription & Document;

class Drug {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  strength: string;

  @Prop({ required: true })
  quantity: string;

  @Prop({ required: true })
  frequency: string;
}

@Schema({ timestamps: true }) 
export class Prescription {
  @Prop({ type: [Drug], required: true })
  drug: Drug[];

  @Prop()
  remarks?: string;

  
  @Prop({ type: Types.ObjectId, ref: 'Patient', required: true })
  patient: Types.ObjectId;

  @Prop({ required: true })
  patientName: string;

  @Prop({ default: false })
  delete_status?: boolean;

  @Prop({ type: Date, default: null })
  deletedAt?: Date;
}

export const PrescriptionSchema = SchemaFactory.createForClass(Prescription);
