import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Inspection, InspectionFilter } from '../../models/inspections.model';
import { isEmpty, jsonToQueryString } from '../../utils/utils';


@Injectable({
  providedIn: 'root'
})
export class InspectionService {

  baseUrl = environment.apiBaseUrl + 'inspections';

  constructor(private http: HttpClient) {
  }

  getAll(queryParams: InspectionFilter) {
    let urlQueryParams = "";
    if (!isEmpty(queryParams)) {
      urlQueryParams = jsonToQueryString(queryParams)
    }
    return this.http.get(this.baseUrl + urlQueryParams);

  }

  getDetails(id: number) {
    return this.http.get(this.baseUrl + "/" + id);
  }

  create(detailData: Inspection) {
    return this.http.post(this.baseUrl + "", detailData);
  }

  update(id: number, detailData: Inspection) {
    return this.http.put(this.baseUrl + "/" + id, detailData);
  }

  delete(id: number) {
    return this.http.delete(this.baseUrl + "/" + id);
  }
}
