

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CreateOrder, PaymentFail, PaymentSuccess } from '../../models/payment.model';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  baseUrl = environment.apiBaseUrl + 'payments';

  constructor(private http: HttpClient) {
  }

  createOrder(orderData: CreateOrder) {
    return this.http.post(this.baseUrl + "/createorder", orderData);
  }

  paymentSuccess(successData: PaymentSuccess) {
    return this.http.post(this.baseUrl + "/success", successData);
  }

  paymentFailure(failureData: PaymentFail) {
    return this.http.post(this.baseUrl + "/failure", failureData);
  }
}
