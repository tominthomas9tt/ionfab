import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Quotation, QuotationFilter } from '../../models/quotations.model';
import { isEmpty, jsonToQueryString } from '../../utils/utils';


@Injectable({
  providedIn: 'root'
})
export class QuotationService {

  baseUrl = environment.apiBaseUrl + 'quotations';

  constructor(private http: HttpClient) {
  }

  getAll(queryParams: QuotationFilter) {
    let urlQueryParams = "";
    if (!isEmpty(queryParams)) {
      urlQueryParams = jsonToQueryString(queryParams)
    }
    return this.http.get(this.baseUrl + urlQueryParams);

  }

  getDetails(id: number) {
    return this.http.get(this.baseUrl + "/" + id);
  }

  create(detailData: Quotation) {
    return this.http.post(this.baseUrl + "", detailData);
  }

  update(id: number, detailData: Quotation) {
    return this.http.put(this.baseUrl + "/" + id, detailData);
  }

  acceptQuotation(id: number, detailData: Quotation) {
    return this.http.put(this.baseUrl + "/accept/" + id, detailData);
  }

  delete(id: number) {
    return this.http.delete(this.baseUrl + "/" + id);
  }
}
