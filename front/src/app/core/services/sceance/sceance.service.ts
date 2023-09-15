import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { HttpClient } from '@angular/common/http';
import { CourseSession } from '@features/sceance/model/sceance';

@Injectable({
  providedIn: 'root'
})

export class SceanceService extends ApiService {
  router: any;

  error(error: any) {
    throw new Error('Method not implemented.');
  }


  constructor(
    private http: HttpClient,

    ) {
  super(http);
}
   

public readSceance() {
  return this.get(`/sceances`);
}

public createSceance(sceances: CourseSession) {
  return this.post(`/sceances`, sceances);
}


public updateSceance(classroom: CourseSession) {
  return this.put(`/sceances/${classroom.id}`, classroom);
}

public deleteSceance(id: string) {
  return this.delete(`/sceances/${id}`);
}

public getSceance(id: string) {
  return this.get(`/sceances/${id}`);
}



}
