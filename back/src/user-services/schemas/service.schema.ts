import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Category, FAQ, Pricing, ServiceStatusEnum, ServiceTypeEnum } from '../service.model';

export type ServiceDocument = Service & Document;

@Schema()
export class Service {

  name: 'userServices';

  @Prop({ required: true })
  title: string;

  @Prop({required: true, type: String})
  description: string;

  @Prop({type: Array})
  FAQ: FAQ[];

  @Prop({ required: true })
  username: string;

  @Prop({ required: true, type: Object })
  pricing: Pricing;

  @Prop({
    enum: ServiceTypeEnum,
    default: ServiceTypeEnum.PRESTATION
  })
  type: string;

  @Prop({
    enum: ServiceStatusEnum,
    default: ServiceStatusEnum.STATUS_NEW
  })
  status: string;

  @Prop({type: Object})
  tags: {
    category: Category,
    subCategory: Category
  };

  @Prop({ type: Array })
  availabilityZones: string[];

  @Prop({
    type: [{
      url: { type: String },
      size: { type: String },
      isCoverImage: { type: Boolean, default: false },
      createdAt: { type: Date, default: Date.now() }
    }]
  })
  images: Array<{ url: String, createdAt: Date }>;

  @Prop({ type: Date, default: Date.now() })
  created_at: Date;

  @Prop({ type: Date, default: Date.now() })
  updated_at: Date;
}

export const ServiceSchema = SchemaFactory.createForClass(Service);
