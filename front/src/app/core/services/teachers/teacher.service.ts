import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { HttpClient } from '@angular/common/http';
import { Teacher } from '@features/teachers/models/teacher-type';

@Injectable({
  providedIn: 'root'
})
export class TeacherService  extends ApiService {
    error(error: any) {
      throw new Error('Method not implemented.');
    }
  
  constructor(
    private http : HttpClient
  ) { 
    super(http);
  }

  public readTeachers(){
    return this.get(`/teachers`);
  }
 
  public createTeacher(teachers: Teacher){
   
    return this.post(`/teachers`, teachers);
  }


  public updateTeacher(teachers: Teacher){
    return this.put(`/teachers/${teachers.id}`, teachers);
  }


  public deleteTeacher(id: string){
    return this.delete(`/teachers/${id}`);
  }
 
  public getTeacher(id:string){
    return this.get(`/teachers/${id}`);
  }
  
  


}

