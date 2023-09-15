import { PartialType } from '@nestjs/mapped-types';
import { ServiceDto } from './create-service.dto';

export class UpdateServiceDto extends PartialType(ServiceDto) {}
