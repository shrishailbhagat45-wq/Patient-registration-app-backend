import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { AuthJwtPayload } from './type/auth-jwtPayload';

@Injectable()
export class AuthService {
    constructor(private userService:UserService,private JwtService:JwtService){}
    async validateUser(email:string,password:string){
        console.log(email,password)
        const user=await this.userService.findUserByEmail(email)
        if(!user){
            console.log("not user")
            throw new UnauthorizedException("User not found")
        }
        const isPasswordMatch=await compare(password,user.password)
        if(!isPasswordMatch){
            throw new UnauthorizedException("Invalid credential")
        }
        console.log("user logged in successfully with email",user.email)
        return{id:user._id,clinicId:user.clinicId,role:user.role};    
    }

    async login(userId:number){
        const payload:AuthJwtPayload={sub:userId}
        const token = this.JwtService.sign(payload)
        const user=await this.userService.findOne(userId)
        return {id:user?._id,clinicId:user?.clinicId,role:user?.role,token:token}
    }

    async validateJwtUser(userId:number){
        const user= await this.userService.findOne(userId)
        if(!user){
            throw new UnauthorizedException("user not found")
        }
        const currentUser={id:user._id,role:user.role,clinicId:user.clinicId}
        return currentUser
    }
}
