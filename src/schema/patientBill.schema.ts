import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { BillingItem } from './billingItem.schema';
import { Patient } from './patient.schema';

export type PatientBillDocument = PatientBill & Document;

class BillItem {
  @Prop({ type: Types.ObjectId, ref: BillingItem.name, required: true })
  item: Types.ObjectId; // reference to BillingItem

  @Prop({ required: true, default: 1 })
  quantity: number;

  @Prop({ required: true })
  price: number;
}

@Schema({ timestamps: true })
export class PatientBill {
  @Prop({ required: true, type: Types.ObjectId, ref: Patient.name , index: true })
  patientId: Types.ObjectId;

  @Prop({ required: true })
  patientName: string;

  @Prop({ type: [BillItem], default: [] })
  items: BillItem[];

  @Prop({ required: false, default: 0 })
  taxPercent: number;

  @Prop({ required: false, default: 0 })
  taxAmount: number;

  @Prop({ required: false, default: '' })
  billNotes: string;

  @Prop({ required: true })
  totalAmount: number;

  @Prop({ required: true })
  doctorId: string;

}

export const PatientBillSchema = SchemaFactory.createForClass(PatientBill);
