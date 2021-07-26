import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Workorder, WorkorderFilter } from '../../models/workorders.model';
import { isEmpty, jsonToQueryString } from '../../utils/utils';


@Injectable({
  providedIn: 'root'
})
export class WorkorderService {

  baseUrl = environment.apiBaseUrl + 'workorders';

  constructor(private http: HttpClient) {
  }

  getAll(queryParams: WorkorderFilter) {
    let urlQueryParams = "";
    if (!isEmpty(queryParams)) {
      urlQueryParams = jsonToQueryString(queryParams)
    }
    return this.http.get(this.baseUrl + urlQueryParams);

  }

  getDetails(id: number) {
    return this.http.get(this.baseUrl + "/" + id);
  }

  create(detailData: Workorder) {
    return this.http.post(this.baseUrl + "", detailData);
  }

  update(id: number, detailData: Workorder) {
    return this.http.put(this.baseUrl + "/" + id, detailData);
  }

  acceptWorkorder(id: number, detailData: Workorder) {
    return this.http.put(this.baseUrl + "/accept-workorder/" + id, detailData);
  }

  markWorkCompleted(id: number, detailData: Workorder) {
    return this.http.put(this.baseUrl + "/work-complete/" + id, detailData);
  }

  quoteWorkOrderChange(id: number, detailData: Workorder) {
    return this.http.put(this.baseUrl + "/quote-work-order-change/" + id, detailData);
  }

  acceptWorkOrderChange(id: number, detailData: Workorder) {
    return this.http.put(this.baseUrl + "/accept-work-order-change/" + id, detailData);
  }

  acceptWorkCompletion(id: number, detailData: Workorder) {
    return this.http.put(this.baseUrl + "/accept-work-complete/" + id, detailData);
  }

  delete(id: number) {
    return this.http.delete(this.baseUrl + "/" + id);
  }
}
