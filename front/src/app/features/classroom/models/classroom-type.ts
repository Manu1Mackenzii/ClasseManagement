import { Students } from "@features/students/models/student-type";


export class ClassroomType {

    id: string;

    label: string;

    // courses: String;
   
    capacity: number;

    sceance: number;
  
    instruments: string;
   
    teachers: string;

    dateDebut:Date;

    dateFin:Date;
    
    coursesStartingTime: Date;
  
    coursesEndingTime: Date;

    createdAt:Date ;
   
    updatedAt: Date;

    students: Students[];
    
 
    
}
