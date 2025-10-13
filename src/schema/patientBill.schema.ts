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
}

@Schema({ timestamps: true })
export class PatientBill {
  @Prop({ required: true, type: Types.ObjectId, ref:Patient.name,trim: true, index: true })
  patient: Types.ObjectId;

  @Prop({ type: [BillItem], default: [] })
  items: BillItem[];

  @Prop({ required: true })
  totalAmount: number;
}

export const PatientBillSchema = SchemaFactory.createForClass(PatientBill);
