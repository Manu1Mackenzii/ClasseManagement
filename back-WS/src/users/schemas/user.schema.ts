import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Exclude } from "class-transformer";

export enum UserSource {
    GOLDEN_USER = 'GOLDEN_USER',
    MOBILE_USER = 'MOBILE_USER',
    FB_USER = 'FB_USER',
    GOOGLE_USER = 'GOOGLE_USER',
    APPLE_USER = 'APPLE_USER'
}

export enum UserRole {
    CLIENT = 'CLIENT',
    TECHNICIAN = 'TECHNICIAN',
    ADMIN = 'ADMIN'
}

export type UserDocument = User & Document;

@Schema()
export class User {

    name: 'users';

    @Prop({
        type: String,
    })
    userId: string;

    @Prop({
        type: String,
    })
    firstName: string;

    @Prop({
        type: String,
    })
    phoneNumber: string;

    @Prop({
        type: String,
        required: false
    })
    lastName: string;

    @Prop({
        type: String,
    })
    username: string;

    @Prop({
        type: String,
        required: true
    })
    email: string;

    @Prop({
        type: String,
        select: false
    })
    @Exclude()
    password: string;

    @Prop({
        type: String,
        required: true
    })
    role: UserRole;


    @Prop({
    type: [{
        url: { type: String },
        size: { type: String },
        createdAt: { type: Date, default: Date.now() }
    }]
    })
    images: Array<{ url: String, createdAt: Date }>;

    @Prop({
    type: [{
        url: { type: String },
        size: { type: String },
        createdAt: { type: Date, default: Date.now() }
    }]
    })
    covers: Array<{ url: String, createdAt: Date }>;

    @Prop({
        type: String,
        required: true
    })
    source: UserSource;

    @Prop({
        type: Date,
        default: Date.now()
    })
    createdAt: string;

    @Prop({
        type: Date,
        default: Date.now()
    })
    updatedAt: string;

    @Prop({
        type: Boolean,
    })
    emailVerified: boolean;

    @Prop({
        type: Boolean,
    })
    profileCompleted: boolean;

}

export const UserSchema = SchemaFactory.createForClass(User);