import { IsArray, IsBoolean, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { UserRole, UserSource } from "../schemas/user.schema";
import * as mongoose from "mongoose";

export class CreateUserDto {

    @IsOptional()
    userId: string | mongoose.Types.ObjectId;

    @IsString()
    @IsOptional()
    firstName: string;

    @IsString()
    @IsOptional()
    lastName: string;

    @IsString()
    @IsOptional()
    phoneNumber: string;
    
    @IsNotEmpty()
    @IsEmail()
    email: string;
    
    @IsString()
    @IsOptional()
    @IsEnum(UserRole)
    role: string;
    
    @IsEnum(UserSource)
    source: string;

    @IsOptional()
    @IsString()
    username: string;
    
    @IsOptional()
    @IsString()
    password: string;

    @IsArray()
    @IsOptional()
    images: any[];

    @IsArray()
    @IsOptional()
    covers: any[];
    
    @IsString()
    @IsOptional()
    createdAt: string;

    @IsString()
    @IsOptional()
    updatedAt: string;

    @IsBoolean()
    @IsOptional()
    emailVerified: boolean;

    @IsBoolean()
    @IsOptional()
    profileCompleted: boolean;
}