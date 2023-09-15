import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type CourseSessionDocument = CourseSession & Document;

@Schema()

export class CourseSession {
    name: 'CourseSession';

    @Prop({
        type: String,
    })
    id: string;

    @Prop({
        type: String,
    })
    classroomId: string;

    @Prop({
        type: String,
    })
    label: string;

    @Prop({
        type: String,
    })
    status: string;

    @Prop({
        type: String,
    })
    notice: string;

    @Prop({
        type: String,
    })
    room: string;

    @Prop({
        type: Array<{ name: string, email: string, id: string }>,
    })
    studentList: Array<{ name: string, email: string, id: string }>;

    @Prop({
        type: Array<{id: string, name: string , email: string}>,
    })
    courseInstructor: Array<{id: string , name: string , email: string}>;

    @Prop()
    signInDate: Date;

    @Prop()
    scheduledStartDate: Date;

    @Prop()
    startDate: Date;

    @Prop()
    scheduledEndDate: Date;

    @Prop()
    EndDate: Date;

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

export const CourseSessionSchema = SchemaFactory.createForClass(CourseSession);