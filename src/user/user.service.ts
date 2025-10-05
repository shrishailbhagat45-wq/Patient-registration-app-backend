import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User } from 'src/schema/user.schema';
import { retry } from 'rxjs';

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

    async findUserByEmail(email:string) {
        const user=await this .userModel.findOne({
            email:email
        })
        return user;
    }
}
