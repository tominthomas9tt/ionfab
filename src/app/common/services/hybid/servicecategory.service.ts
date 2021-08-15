import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import ServiceCategories from '../../repository/services';

const serviceCategories = ServiceCategories;
@Injectable({
  providedIn: 'root'
})
export class ServicecategoriesService {

  baseUrl = environment.apiBaseUrl + 'servicecategories';

  constructor(private http: HttpClient) {
  }

  getAllLocalServiceCategories(onlyCanShow = true) {
    let scs = ServiceCategories;
    if (onlyCanShow) {
      scs = serviceCategories.filter(sc => sc.canShow == true);
    }
    return scs;
  }

  getLocalSeriveCategoryById(id: number) {
    let category = serviceCategories.find(item => item.id == id);
    return category;
  }

  getAllServiceCategories() {
    return this.http.get(this.baseUrl);
  }
}
