import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BusinessserviceRequest } from '../../models/businessservice';

@Injectable({
  providedIn: 'root'
})
export class BusinessservicesService {

  baseUrl = environment.apiBaseUrl + 'businessservices';

  constructor(private http: HttpClient) {
  }

  getAllBusinessservices(userId: number) {
    return this.http.get(this.baseUrl + "/business/" + userId);

  }

  getBusinessserviceDetails(businessserviceId: number) {
    return this.http.get(this.baseUrl + "/" + businessserviceId);
  }

  createBusinessservice(businessserviceData: BusinessserviceRequest) {
    return this.http.post(this.baseUrl + "", businessserviceData);
  }

  createMultipleBusinessservice(multipleBusinessserviceData: BusinessserviceRequest) {
    return this.http.post(this.baseUrl + "/add-multiple", multipleBusinessserviceData);
  }

  updateBusinessservice(businessserviceId: number, businessserviceData: BusinessserviceRequest) {
    return this.http.put(this.baseUrl + "/" + businessserviceId, businessserviceData);
  }

  deleteBusinessservice(businessserviceId: number) {
    return this.http.delete(this.baseUrl + "/" + businessserviceId);
  }
}
