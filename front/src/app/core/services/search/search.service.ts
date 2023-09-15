import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchCategory } from '@core/models/category';
import { Observable, of } from 'rxjs';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class SearchService extends ApiService {

  constructor(private http: HttpClient) {
    super(http);
  }

  public getPopularCategories(): Observable<SearchCategory[]> {
    // return this.get('/search/categories?popular=true');
    return of([])
  }

  /**
   * Research
   */
  searchServices(query?: any): Observable<any> {
    return this.get('/services', query);
  }

  getServiceDetails(id: string): Observable<any> {
    return this.get('/services/' + id);
  }

  getRecentlyViewed(): Observable<any[]> {
   return this.get('/services?limit=12');
  }

}
