import { IsArray, IsEnum, IsNotEmpty, IsObject, IsOptional, IsString, Length } from "class-validator";
import { FAQ, Pricing, ServiceStatusEnum, ServiceTypeEnum } from "../service.model";

export class CategoryDto {

    @IsString()
    @Length(2,255)
    @IsNotEmpty()
    label: string;

    @IsString()
    @IsNotEmpty()
    code: string;

    @IsString()
    @IsOptional()
    parentCode: string;

    @IsString()
    @IsOptional()
    created_at: string;

    @IsString()
    @IsOptional()
    updated_at: string;
}
