import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type TokenDocument = Token & Document;

@Schema()
export class Token {

  @Prop({
    type: String,
  })
  id: String;

  @Prop({
    type: String,
  })
  userId?: String;

  @Prop({
    type: Date,
  })
  issuedAt: Date;

  @Prop({ type: Date})
  expiresAt: Date;
}

export const TokenSchema = SchemaFactory.createForClass(Token);
