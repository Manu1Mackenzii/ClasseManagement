import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type NotificationDocument = Notification & Document;

@Schema()
export class Notification {

    @Prop({
        type: mongoose.Schema.Types.ObjectId,
    })
    id: mongoose.Schema.Types.ObjectId;

    @Prop({
        type: mongoose.Schema.Types.ObjectId,
    })
    panelId: mongoose.Schema.Types.ObjectId;

    @Prop({
        required: true,
        type: String,
    })
    userId: string;

    @Prop({type: String})
    description: string;

    @Prop({
        required: true,
        type: Boolean,
        default: false
    })
    isResolved: Boolean;

    @Prop({ type: Date, default: Date.now() })
    createdAt: Date;

    @Prop({ type: Date, default: Date.now() })
    updatedAt: Date;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);
