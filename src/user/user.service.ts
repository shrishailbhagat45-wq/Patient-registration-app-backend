import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User, Role } from 'src/schema/user.schema';
import { GetReceptionistsDto } from 'src/dto/get-receptionists.dto';
import { CreateDoctorDto } from 'src/dto/create-doctor.dto';

@Injectable()
export class UserService {
    constructor(@InjectModel('User') private userModel:Model<User>) {
        console.log('UserService initialized');
    }
    async createUser(userData) {
        const checkEmailIsPresent = await this.findUserByEmail(userData.email);
        if(checkEmailIsPresent) {
            return { status: 409, message: 'Email already exists', error: ' Email already in use' };
        }
         const hashedPassword = await bcrypt.hash(userData.password, 10);

        // Create user object
        const data = { ...userData, password: hashedPassword };

        // Save user
        const response = await this.userModel.create(data);
        if(!response) {
            return { status: 400, message: 'User creation failed', error: 'Failed to create user' };
        }
        return { message: 'User created successfully', status: 201, error: null };
    }

    async getUserById(id:string) {
        const user=await this.userModel.findOne({
            _id:id
        })
        return {name:user?.name,email:user?.email,role:user?.role,joinedAt:user?.createdAt,phoneNumber:user?.phoneNumber};
    }

    async findUserByEmail(email:string) {
        const user=await this.userModel.findOne({
            email:email,
        } )
        return user;
    }

    async findOne(userId:number){
        const user=await this.userModel.findOne({
            _id:userId
        })
        return user
    }

    async addDoctor(doctorData: CreateDoctorDto) {
        const existingUser = await this.userModel.findOne({ email: doctorData.email });
        if (existingUser) {
            return { status: 409, message: 'Email already exists', error: 'Email already in use' };
        }

        const hashedPassword = await bcrypt.hash(doctorData.password, 10);
        const data = {
            ...doctorData,
            password: hashedPassword,
            role: Role.DOCTOR,
        };

        const newDoctor = new this.userModel(data);
        const saved = await newDoctor.save();
        return { message: 'Doctor created successfully', status: 201, error: null, doctorId: saved._id };
    }

    async addReceptionist(receptionistData: any) {
        const checkEmailIsPresent = await this.userModel.findOne({
            email: receptionistData.email,
            clinicId: receptionistData.clinicId,
        });
        if(checkEmailIsPresent) {
            return { status: 409, message: 'Email already exists', error: ' Email already in use' };
        }
        const hashedPassword = await bcrypt.hash(receptionistData.password, 10);
        const data = { ...receptionistData, password: hashedPassword };
        const newReceptionist = new this.userModel(data);
        return newReceptionist.save();
    }

    async getReceptionistsByClinicId(data: GetReceptionistsDto) {
        if(data.role==='Doctor'){
            const doctorId= new Types.ObjectId(data.doctorId)
            return this.userModel.find({ role: 'Receptionist', doctorId:doctorId }).exec();
        }
        const clinicId= new Types.ObjectId(data.clinicId)
        return this.userModel.find({ role: 'Receptionist', clinicId: clinicId }).exec();
    }

    

    async getDoctorByClinicId(id:string){
        const clinicId= new Types.ObjectId(id)
        return this.userModel.find({ role: 'Doctor', clinicId: clinicId }).exec();
    }
    
    deleteUser(id: string) {
        return this.userModel.findByIdAndDelete(id).exec();
    }

    async updateUser(id: string, updateData: any) {
        try {
            const updatedUser = await this.userModel.findByIdAndUpdate(id, { $set: updateData }, { new: true }).exec();
            return updatedUser;
        } catch (error) {
            console.error('Error updating user:', error);
            throw new Error('User update failed');
        }
    }

    async updatePassword(id: string, passwordData: any) {
        try {
            const user = await this.userModel.findById(id).exec();
            if (!user) {
                return { status: 404, message: 'User not found', error: 'No user with the provided ID' };
            }
            const isPasswordMatch=await bcrypt.compare(passwordData.currentPassword,user.password)
            if(!isPasswordMatch){
                return { status: 400, message: 'Current password is incorrect', error: 'Incorrect current password' };
            }
            const hashedNewPassword = await bcrypt.hash(passwordData.newPassword, 10);
            const updatedUser=await this.userModel.findByIdAndUpdate(id, { $set: { password: hashedNewPassword } }, { new: true }).exec();
            return { status: 200, message: 'Password updated successfully', error: null, updatedUser };
        }
        catch (error) {
            console.error('Error updating password:', error);
            throw new Error('Password update failed');
        }   
    }
}