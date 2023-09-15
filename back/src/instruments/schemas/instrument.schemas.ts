import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { share } from "rxjs";



export type InstrumentDocument = Instrument & Document;
@Schema()
    export class Instrument {
    
        name: 'instruments';
    
        @Prop({
            type: String,
        })
        id: string;
    
        @Prop({
            type: String,
        })
        label: string;
    
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
    
    export const InstrumentSchema = SchemaFactory.createForClass(Instrument);