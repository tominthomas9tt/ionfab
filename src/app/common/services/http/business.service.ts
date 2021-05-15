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

  getBusinessDetails(id:number) {
    return this.http.get(this.baseUrl + "/" + id);
  }

  updateBusiness(userId: number, businessData: BusinessDetails) {
    return this.http.put(this.baseUrl + "/" + userId, businessData);
  }

}
