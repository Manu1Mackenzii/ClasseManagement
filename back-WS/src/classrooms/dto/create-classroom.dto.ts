import { IsArray, IsBoolean, IsDate, IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, isString } from "class-validator";
import mongoose from "mongoose";
import { TeacherDocument } from "src/teachers/schemas/teacher.schema";



export class CreateClassroomDto {
    
   
    @IsOptional() 
    id: string | mongoose.Types.ObjectId;

    @IsString()
    @IsOptional()
    label: String;

    @IsOptional()
    sceance: number;
    
    @IsOptional()
    capacity: number;
  
    @IsString()
    @IsOptional()
    instruments: string[];

   
    @IsOptional()
    students: string[];

    @IsString()
    @IsOptional()
    teachers: TeacherDocument[];
  
    @IsString()
    @IsOptional()
    dateDebut: Date;

    @IsString()
    @IsOptional()
    dateFin: Date;

   
    @IsOptional()
    coursesStartingTime: Date;
  

    @IsOptional()
    coursesEndingTime: Date;
  
    
    // @IsOptional()
    // teacherId: String | mongoose.Types.ObjectId;
       
    
    // @IsOptional()
    // courseId: number | mongoose.Types.ObjectId;

    
    @IsOptional()
    createdAt: string;

    
    @IsOptional()
    updatedAt: string;


   
}