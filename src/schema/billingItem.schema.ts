import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BillingItemDocument = BillingItem & Document;

@Schema({ timestamps: true })
export class BillingItem {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  price: number;
  
}

export const BillingItemSchema = SchemaFactory.createForClass(BillingItem);