import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User } from 'src/schema/user.schema';
import { retry } from 'rxjs';
import { use } from 'passport';
import { join } from 'path';

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
            email:email
        })
        return user;
    }

    async findOne(userId:number){
        const user=await this.userModel.findOne({
            _id:userId
        })
        return user
    }

    async addReceptionist(receptionistData: any) {
        const checkEmailIsPresent = await this.userModel.findOne({
            email: receptionistData.email,
            doctorId: receptionistData.doctorId,
        });
        if(checkEmailIsPresent) {
            return { status: 409, message: 'Email already exists', error: ' Email already in use' };
        }
        const hashedPassword = await bcrypt.hash(receptionistData.password, 10);
        const data = { ...receptionistData, password: hashedPassword };
        const newReceptionist = new this.userModel(data);
        return newReceptionist.save();
    }

    async getReceptionistsByDoctorId(doctorId: string) {
        return this.userModel.find({ role: 'Receptionist', doctorId: doctorId }).exec();
    }
    deleteUser(id: string) {
        return this.userModel.findByIdAndDelete(id).exec();
    }
}