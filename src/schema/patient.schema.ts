import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';


export type PatientDocument = Patient & Document;

export enum Gender {
  Male = 'Male',
  Female = 'Female',
  Other = 'Other'
}

@Schema({ timestamps: true , autoIndex: true })
export class Patient {
  @Prop({ required: true, index: true, trim: true })
  name: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true, index: true })
  userId: Types.ObjectId;

  @Prop({ type: String, enum: Gender, required: true })
  gender: Gender;

  @Prop({ required: true})
  age: number;

  @Prop({ required: true,unique: true,index: true  })
  phoneNumber: string;

  @Prop({ required: true })
  weight: number;

  @Prop({ default: false })
  delete_status?: boolean;

  @Prop({ type: Date, default: null })
  deletedAt?: Date;
  
}

const PatientSchema = SchemaFactory.createForClass(Patient);

PatientSchema.index({ name:1, userId:1 }, { unique: true });

export {PatientSchema};



