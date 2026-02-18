import {IsEmail,IsString}from "class-validator";
import { UserRole } from "src/common/enums/user-role.enum";

export class CreateUserDto{
    @IsString()
    name:string;
    @IsEmail()
    email:string;
    @IsString()
    password:string;
    role:UserRole;
}