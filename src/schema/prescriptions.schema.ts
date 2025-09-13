import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type PrescriptionDocument = Prescription & Document;

@Schema({ timestamps: true }) 
export class Prescription {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  strength: string;

  @Prop({ required: true })
  quantity: string;

  @Prop({ required: true })
  frequency: string;

  @Prop()
  remarks?: string;

  @Prop({ type: Types.ObjectId, ref: 'Patient', required: true })
  patient: Types.ObjectId;

  @Prop({ type: Date, default: null })
  deletedAt?: Date;
}

export const PrescriptionSchema = SchemaFactory.createForClass(Prescription);

// // Virtual for id
// PrescriptionSchema.virtual('id').get(function (this: PrescriptionDocument) {
//   return this._id.toHexString();
// });

// PrescriptionSchema.set('toJSON', {
//   virtuals: true,
// });