import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsPhoneNumber } from 'class-validator';
import { Document, Types } from 'mongoose';

export type PatientDocument = PatientQueue & Document;

@Schema({ timestamps: true, autoIndex: true })
export class PatientQueue {
    @Prop({ required: true, trim: true })
    name: string;
    @Prop({ type: Types.ObjectId, ref: 'Patient', required: true, index: true, set: (value: string | Types.ObjectId) => {
        if (typeof value === 'string') {
            return new Types.ObjectId(value);
        }
        return value;
    } })
    patientId: Types.ObjectId
    @Prop({ type: Types.ObjectId, ref: 'Clinic', required: true, index: true, set: (value: string | Types.ObjectId) => {
        if (typeof value === 'string') {
            return new Types.ObjectId(value);
        }
        return value;
    } })
    clinicId: Types.ObjectId;
    @Prop({
        type: Types.ObjectId, ref: 'Clinic', required: true, index: true, set: (value: string | Types.ObjectId) => {
            if (typeof value === 'string') {
                return new Types.ObjectId(value);
            }
            return value;
    } })
    doctorId: Types.ObjectId;
    @Prop({ required: true, trim: true })
    phoneNumber: string;
}

const PatientQueueSchema = SchemaFactory.createForClass(PatientQueue);

// TTL index: remove documents 1 day (86400 seconds) after createdAt
PatientQueueSchema.index({ createdAt: 1 }, { expireAfterSeconds: 60 * 60 * 24 });

// Compound index on phoneNumber and name
PatientQueueSchema.index({ phoneNumber: 1, name: 1 });



export default PatientQueueSchema;