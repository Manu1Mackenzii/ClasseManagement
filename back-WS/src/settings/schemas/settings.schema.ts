import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';

export type SettingsDocument = Settings & Document;

@Schema()
export class Settings {

  @Prop({type: String})
  url_cgu_ilenatech: string;

  @Prop({type: String})
  url_pdc_ilenatech: string;

  @Prop({type: String})
  url_faq_ilenatech: string;

  @Prop({type: String})
  url_cgu_ilenapro: string;

  @Prop({type: String})
  url_pdc_ilenapro: string;

  @Prop({type: String})
  url_faq_ilenapro: string;

}

export const SettingsSchema = SchemaFactory.createForClass(Settings);
