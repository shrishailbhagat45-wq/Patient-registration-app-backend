import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type BillingItemDocument = BillingItem & Document;

@Schema({ timestamps: true })
export class BillingItem {
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  price: number;
  @Prop({ required: true })
  doctorId: Types.ObjectId;
}

export const BillingItemSchema = SchemaFactory.createForClass(BillingItem);

BillingItemSchema.index({ doctorId: 1, name: 1 });