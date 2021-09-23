import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { District, DistrictFilter } from '../../models/districts.model';
import { isEmpty, jsonToQueryString } from '../../utils/utils';

@Injectable({
  providedIn: 'root'
})
export class DistrictService {

  baseUrl = environment.apiBaseUrl + 'districts';

  constructor(private http: HttpClient) {
  }

  getAll(queryParams: DistrictFilter) {
    let urlQueryParams = "";
    if (!isEmpty(queryParams)) {
      urlQueryParams = jsonToQueryString(queryParams)
    }
    return this.http.get(this.baseUrl + urlQueryParams);
  }

  getDetails(id: number) {
    return this.http.get(this.baseUrl + "/" + id);
  }

  create(detailData: District) {
    return this.http.post(this.baseUrl + "", detailData);
  }

  update(id: number, detailData: District) {
    return this.http.put(this.baseUrl + "/" + id, detailData);
  }

  delete(id: number) {
    return this.http.delete(this.baseUrl + "/" + id);
  }
}
