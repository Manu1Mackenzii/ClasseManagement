import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { HttpClient } from '@angular/common/http';
import { Students } from '@features/students/models/student-type';

@Injectable({
  providedIn: 'root'
})
export class StudentService extends ApiService {
  error(error: any) {
    throw new Error('Method not implemented.');
  }

constructor(
  private http : HttpClient
) { 
  super(http);
}

public readStudents(){
  return this.get(`/students`);
}

public createStudent(students: Students){
 
  return this.post(`/students`, students);
}


public updateStudent(students: Students){
  return this.put(`/students/${students.id}`, students);
}


public deleteStudent(id: string){
  return this.delete(`/students/${id}`);
}

public getStudent(id: string){
  return this.get(`/students/${id}`);
}

}