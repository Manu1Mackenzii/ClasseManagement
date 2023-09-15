import { IsArray, IsBoolean, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import {  StudentSource } from "../schemas/student.schema";
import * as mongoose from "mongoose";

export class CreateStudentDto {

    @IsOptional()
    id: string | mongoose.Types.ObjectId;

    @IsString()
    @IsOptional()
    lastname: string;

    @IsString()
    @IsOptional()
    firstname: string;

   
    @IsOptional()
    phone: number;

    @IsString()
    @IsOptional()
    address: string;

    
    @IsOptional()
    instruments: string[];

    @IsOptional()
    instrumentId: string;

    @IsOptional()
    classroomId: string;
    
    @IsOptional()
    @IsString()
    email: string;
    
    // @IsString()
    // @IsOptional()
    // @IsEnum(TeacherRole)
    // role: string;
    
    // @IsOptional()
    // @IsEnum(TeacherSource)
    // source: string;

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
}