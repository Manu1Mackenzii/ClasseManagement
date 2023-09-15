import { IsArray, IsEnum, IsNotEmpty, IsObject, IsOptional, IsString, Length } from "class-validator";
import { FAQ, Pricing, ServiceStatusEnum, ServiceTypeEnum } from "../service.model";

export class ServiceDto {

    @IsEnum(ServiceTypeEnum)
    @Length(2,255)
    @IsNotEmpty()
    type: ServiceTypeEnum;

    @IsString()
    @Length(2,255)
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    username: string;

    @IsObject()
    @IsNotEmpty()
    tags: any;

    @IsArray()
    availabilityZones: string[];
    
    @IsArray()
    @IsOptional()
    images: any[];

    @IsObject()
    @IsNotEmpty()
    pricing: Pricing;

    @IsString()
    description: string;

    @IsArray()
    FAQ: FAQ[];

    @IsEnum(ServiceStatusEnum)
    @IsOptional()
    status: ServiceStatusEnum;

    @IsString()
    @IsOptional()
    created_at: string;

    @IsString()
    @IsOptional()
    updated_at: string;
}
