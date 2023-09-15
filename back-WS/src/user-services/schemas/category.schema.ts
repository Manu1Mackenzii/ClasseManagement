import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type CategoryDocument = Category & Document;

@Schema()
export class Category {

  name: 'categories';

  @Prop({ required: true })
  label: string;

  @Prop({ required: true })
  code: string;

  @Prop({ type: String })
  parentCode: string;


  @Prop({ type: Date, default: Date.now() })
  created_at: Date;

  @Prop({ type: Date, default: Date.now() })
  updated_at: Date;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
