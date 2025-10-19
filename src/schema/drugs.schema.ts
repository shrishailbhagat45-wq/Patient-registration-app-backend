import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';         
import { Document } from 'mongoose';

export type DrugsDocument = Drugs & Document;
@Schema({ timestamps: true, autoIndex: true })
export class Drugs {
    @Prop({ required: true })
    company: string;
    @Prop({ required: true })
    content: string;
    @Prop({ required: true, index: true })
    name: string;
}

export const DrugsSchema = SchemaFactory.createForClass(Drugs);