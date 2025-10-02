import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schema/user.schema';

@Injectable()
export class UserService {
    constructor(@InjectModel('User') private userModel:Model<User>) {
        console.log('UserService initialized');
    }
    async createUser(userData) {
        const checkEmailIsPresent = await this.userModel.findOne({ email: userData.email });
        if(checkEmailIsPresent) {
            return { status: 409, message: 'Email already exists', error: ' Email already in use' };
        }
        const response = await this.userModel.create(userData);
        if(!response) {
            return { status: 400, message: 'User creation failed', error: 'Failed to create user' };
        }
        return { message: 'User created successfully', data: response, status: 201, error: null };
    }
}
