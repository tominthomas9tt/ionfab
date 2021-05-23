import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BusinessserviceRequest } from '../../models/businessservice';
import { ServiceFilterParams } from '../../models/services';
import { isEmpty, jsonToQueryString } from '../../utils/utils';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  baseUrl = environment.apiBaseUrl + 'services';

  constructor(private http: HttpClient) {
  }

  getAllServices(queryParams?: ServiceFilterParams) {
    let urlQueryParams = "";
    if (!isEmpty(queryParams)) {
      urlQueryParams = jsonToQueryString(queryParams)
    }
    return this.http.get(this.baseUrl + urlQueryParams);
  }
}
