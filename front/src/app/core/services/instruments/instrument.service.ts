import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { HttpClient } from '@angular/common/http';
import { Instruments } from '@features/instruments/models/instrument-type';

@Injectable({
  providedIn: 'root'
})
export class InstrumentService extends ApiService {
  error(error: any) {
    throw new Error('Method not implemented.');
  }


  constructor(
    private http : HttpClient,
  ) { 
    super(http);
  }
  


  public readInstrument(){
    return this.get(`/instruments`);
  }
 
  public createInstrument(instruments: Instruments){
   
    return this.post(`/instruments`, instruments);
  }


  public updateInstrument(instruments: Instruments){
    return this.put(`/instruments/${instruments.id}`, instruments);
  }


  public deleteInstrument(id: string){
    return this.delete(`/instruments/${id}`);
  }
 

}
