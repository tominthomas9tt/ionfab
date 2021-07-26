import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Tender, TenderFilter } from '../../models/tenders.model';
import { isEmpty, jsonToQueryString } from '../../utils/utils';


@Injectable({
  providedIn: 'root'
})
export class TenderService {

  baseUrl = environment.apiBaseUrl + 'tenders';

  constructor(private http: HttpClient) {
  }

  getAll(queryParams: TenderFilter) {
    let urlQueryParams = "";
    if (!isEmpty(queryParams)) {
      urlQueryParams = jsonToQueryString(queryParams)
    }
    return this.http.get(this.baseUrl + urlQueryParams);

  }

  getDetails(id: number) {
    return this.http.get(this.baseUrl + "/" + id);
  }

  create(detailData: Tender) {
    return this.http.post(this.baseUrl + "", detailData);
  }

  inspectionPaymentSuccess(id: number, detailData: Tender) {
    return this.http.put(this.baseUrl + "/inspection/payment-success/" + id, detailData);
  }

  update(id: number, detailData: Tender) {
    return this.http.put(this.baseUrl + "/" + id, detailData);
  }

  delete(id: number) {
    return this.http.delete(this.baseUrl + "/" + id);
  }
}
