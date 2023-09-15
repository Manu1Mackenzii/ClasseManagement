import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WcOrderType } from '@features/admin-board/models/wc-orders.type';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WordpressService {

  headerOptions = {
    headers: new HttpHeaders({
      'Mga-Access-Token': environment.mgaAccessTokenSecret
    })
  };
  constructor(private http: HttpClient) {
  }

  getUserOrdersWC(category: string) {
    const options = this.headerOptions;
    return this.http.get<WcOrderType[]>(environment.mgaWebsiteApiUrl + '?category=' + category, options);
  }

  getStripeProducts() {
    const options = this.headerOptions;
    return this.http.get<WcOrderType[]>(environment.mgaWebsiteApiUrl + '?category=STRIPE_PRODUCTS', options);
  }

  getStripeCustomerSources(customerId: string) {
    const options = this.headerOptions;
    return this.http.get<WcOrderType[]>(environment.mgaWebsiteApiUrl + '?category=CUSTOMER_SOURCES&customer_id=' + customerId, options);
  }

  createStripeSubscription(productId: string, customerId: string, orderId: string) {
    const options = this.headerOptions;
    const formData = new FormData;
    formData.append('productId', productId);
    formData.append('customerId', customerId);
    formData.append('orderId', orderId);
    return this.http.post(
      environment.mgaWebsiteApiUrl, formData,
      options);
  }

}
