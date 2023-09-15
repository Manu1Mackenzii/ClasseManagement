import { IsBoolean, IsMongoId, IsNotEmpty, IsOptional, IsString, Length } from "class-validator";

export class CreateNotificationDto {

    @IsString()
    @IsMongoId()
    @IsOptional()
    id: string;

    @IsString()
    @IsNotEmpty()
    @IsMongoId()
    panelId: string;

    @IsString()
    @IsNotEmpty()
    userId: string;

    @IsBoolean()
    @IsOptional()
    isResolved: Boolean;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsString()
    @IsOptional()
    createdAt: string;

    @IsString()
    @IsOptional()
    updatedAt: string;

}
