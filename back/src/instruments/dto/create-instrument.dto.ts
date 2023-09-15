import { IsOptional, IsString } from "class-validator";
import mongoose from "mongoose";



export class CreateInstrumentDto {
    
    @IsOptional() 
    id: string | mongoose.Types.ObjectId;

    @IsString()
    label: string;

    @IsOptional()
    createdAt: string;

    @IsOptional()
    updatedAt: string;
}
