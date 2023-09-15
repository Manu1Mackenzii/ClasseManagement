import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Exclude } from "class-transformer";
import { IsEnum } from "class-validator";
import mongoose from "mongoose";

export enum TeacherSource {
    GOLDEN_USER = 'GOLDEN_USER',
    MOBILE_USER = 'MOBILE_USER',
    FB_USER = 'FB_USER',
    GOOGLE_USER = 'GOOGLE_USER',
    APPLE_USER = 'APPLE_USER'
}

export enum TeacherRole {
    CLIENT = 'CLIENT',
    TECHNICIAN = 'TECHNICIAN',
    ADMIN = 'ADMIN'
}

export enum TeacherFonction {
    INTERNE = 'INTERNE',
    EXTERNE = 'EXTERNE'
}

export type TeacherDocument = Teacher & Document;

@Schema()
export class Teacher {

    name: 'teachers';

    @Prop({
        type: String,
        ref: "User",
        required: true
    
     })
     id: string;

     @Prop({
        type: String,
    })
    instrumentId: string;

    @Prop({
        type: String,
    })
    classroomId: string;
     
     @Prop({
        type: String,
    })
    firstname: string;

    @Prop({
        type: String,
    })
    lastname: string;

    @Prop({
        type: String,
    })
    email: string;

    @Prop({
        type: [String], 
      })
      instruments: string[];

    @Prop({
        type: String,
    })
    phone: number;

    @Prop({
        type: String,
    })
        address: string;

    @Prop({
        type: Number,
    })
    Tarif: Number;

    @Prop({
        type: String,
    })
    Course: string;

    @Prop({
        type: String,
    })
    Availability: string;

    @Prop({
        type: String,
        required: false
    })
    source: TeacherSource;

    @Prop({
        type: Number,
    })
    Notation: Number;

    @Prop({
        type: Number,
    })
    Level: Number;

  
    // @Prop({
    // type: [{
    //     url: { type: String },
    //     size: { type: String },
    //     createdAt: { type: Date, default: Date.now() }
    // }]
    // })
    // images: Array<{ url: String, createdAt: Date }>;

    // @Prop({
    // type: [{
    //     url: { type: String },
    //     size: { type: String },
    //     createdAt: { type: Date, default: Date.now() }
    // }]
    // })
    // covers: Array<{ url: String, createdAt: Date }>;

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
    profileCompleted: boolean;
    static email: any;


}

export const TeacherSchema = SchemaFactory.createForClass(Teacher );

