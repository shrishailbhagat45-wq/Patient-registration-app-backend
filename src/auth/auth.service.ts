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

        return{id:user._id};    
    }

    login(userId:number){
        const payload:AuthJwtPayload={sub:userId}
        return this.JwtService.sign(payload)
    }
}
