import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

export enum Role{
    DOCTOR='Doctor', 
    RECEPTIONIST='Receptionist',
    MANAGER='Manager',
    ADMIN='Admin'
}

@Schema({ timestamps: true })
export class User {
    @Prop({ required: true, trim: true })
    name: string;

    @Prop({ required: true, unique: true, lowercase: true, trim: true })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop({ required: true, enum: Role })
    role: Role;

    @Prop({ required: false })
    doctorId?: string;

    @Prop({required: false})
    specialization?: string;

    @Prop({ default: false })
    delete_status?: boolean;

    @Prop({ type: Date, default: null })
    deletedAt?: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
