import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Pincode, PincodeFilter } from '../../models/pincodes.model';
import { isEmpty, jsonToQueryString } from '../../utils/utils';


@Injectable({
  providedIn: 'root'
})
export class PincodeService {

  baseUrl = environment.apiBaseUrl + 'pincodes';

  constructor(private http: HttpClient) {
  }

  getAll(queryParams: PincodeFilter) {
    let urlQueryParams = "";
    if (!isEmpty(queryParams)) {
      urlQueryParams = jsonToQueryString(queryParams)
    }
    return this.http.get(this.baseUrl + urlQueryParams);

  }

  getDetails(id: number) {
    return this.http.get(this.baseUrl + "/" + id);
  }

  create(detailData: Pincode) {
    return this.http.post(this.baseUrl + "", detailData);
  }

  update(id: number, detailData: Pincode) {
    return this.http.put(this.baseUrl + "/" + id, detailData);
  }

  delete(id: number) {
    return this.http.delete(this.baseUrl + "/" + id);
  }
}
