import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  protected REST_API_SERVER = environment.baseUrl;
  protected headers: HttpHeaders = new HttpHeaders;

  constructor(protected httpClient: HttpClient) {}

  protected postWithoutAuth(endpoint: string, data: any): any {
    return this.httpClient.post(this.REST_API_SERVER + endpoint, data);
  }

  protected get(endpoint: string, params?: any): any {
    return this.httpClient.get(this.REST_API_SERVER + endpoint);
  }

  protected post(endpoint: string, data: any): any {
    return this.httpClient.post(this.REST_API_SERVER + endpoint, data);
  }

  protected put(endpoint: string, data: any): any {
    return this.httpClient.put(this.REST_API_SERVER + endpoint, data);
  }

  protected delete(endpoint: string): any {
    return this.httpClient.delete(this.REST_API_SERVER + endpoint);
  }

}
