import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BusinessserviceRequest } from '../../models/businessservice';

@Injectable({
  providedIn: 'root'
})
export class ServicecategoriesService {

  baseUrl = environment.apiBaseUrl + 'servicecategories';

  constructor(private http: HttpClient) {
  }

  getAllServiceCategories() {
    return this.http.get(this.baseUrl);
  }
}
