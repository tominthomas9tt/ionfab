import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BusinessDetails } from '../../models/business';

@Injectable({
  providedIn: 'root'
})
export class BusinessService {

  baseUrl = environment.apiBaseUrl + 'business';

  constructor(private http: HttpClient) {
  }

  getBusinessStatus() {
    return this.http.get(this.baseUrl + "/businessstatus");
  }

  getBusinessDetails(id: number) {
    return this.http.get(this.baseUrl + "/" + id);
  }

  createBusiness(businessData: BusinessDetails) {
    return this.http.post(this.baseUrl, businessData);
  }

  updateBusiness(userId: number, businessData: BusinessDetails) {
    return this.http.put(this.baseUrl + "/" + userId, businessData);
  }

  markAsPaid(userId: number) {
    return this.http.post(this.baseUrl + "/mark-paid", { "userId": userId });
  }

}