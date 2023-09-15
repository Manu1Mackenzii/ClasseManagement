import { IsArray, IsBoolean, IsDate, IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, isString  } from "class-validator";
import mongoose from "mongoose";


export class CreateSessionDto {
 
   
  @IsOptional() 
  id: string | mongoose.Types.ObjectId;

  @IsOptional()
  classroomId: number | mongoose.Types.ObjectId;

  @IsString()
  @IsOptional()
  label: String;

  @IsOptional()
  status: string;
  
  @IsOptional()
  notice: string;

  @IsOptional()
  room: string;

  @IsOptional()
  studentList:  string[];

  @IsOptional()
  courseInstructor:  string[];

  @IsString()
  @IsOptional()
  signInDate: Date;

  @IsOptional()
  scheduledStartDate: Date;

  @IsOptional()
  startDate: Date;

  @IsOptional()
  scheduledEndDate: Date;

  @IsOptional()
  EndDate: Date;
  
  @IsOptional()
  createdAt: string;

  @IsOptional()
  updatedAt: string;


 
}
