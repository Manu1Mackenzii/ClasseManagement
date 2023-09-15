import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { HttpClient } from '@angular/common/http';
import { ClassroomType } from '@features/classroom/models/classroom-type';
import {  Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class ClassroomService extends ApiService {
  router: any;

  error(error: any) {
    throw new Error('Method not implemented.');
  }



  constructor(
    private http: HttpClient,

  ) {
    super(http);
  }

  public readClassroom() {
    return this.get(`/classrooms`);
  }

  public createClassroom(classrooms: ClassroomType) {

    return this.post(`/classrooms`, classrooms);
  }


  public updateClassroom(classroom: ClassroomType) {
    return this.put(`/classrooms/${classroom.id}`, classroom);
  }


  public deleteClassroom(id: string) {
    return this.delete(`/classrooms/${id}`);
  }

  public deleteStudentFromClassroom(classroom: ClassroomType, studentId: string): Observable<any> {
    return this.delete(`/classrooms/${classroom.id}/students/${studentId}`);
  }

  public getClassroom(id: string) {
    return this.get(`/classrooms/${id}`);
  }

public generateSessions(id : string){
 return this.get(`classrooms/${id}/course-sessions`)
}

}
