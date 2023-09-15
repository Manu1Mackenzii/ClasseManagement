import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

import * as mongoose from 'mongoose';




export type ClassroomDocument = Classroom & Document;

@Schema()
export class Classroom {

    name: 'classrooms';

    @Prop({
        type: String,
    })
    id: string;

    @Prop({
        type: String,
    })
    label: string;

    @Prop()
    sceance: number;

    @Prop()
    capacity: number;
  
    @Prop()
    instruments: string;

    @Prop()
    teachers: string;

    @Prop()
    dateDebut: string;

    @Prop()
    dateFin: string;

    @Prop()
    coursesStartingTime: string;
  
    @Prop()
    coursesEndingTime: string;

    @Prop({
        type: [String], 
      })
      students: string[];

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
 

    


}

export const ClassroomSchema = SchemaFactory.createForClass(Classroom);