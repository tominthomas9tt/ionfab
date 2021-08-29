import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Invoice, InvoiceFilter } from '../../models/invoice';
import { isEmpty, jsonToQueryString } from '../../utils/utils';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  baseUrl = environment.apiBaseUrl + 'bills';

  constructor(private http: HttpClient) {
  }

  getAllInvoices(queryParams: InvoiceFilter) {
    let urlQueryParams = "";
    if (!isEmpty(queryParams)) {
      urlQueryParams = jsonToQueryString(queryParams)
    }
    return this.http.get(this.baseUrl + urlQueryParams);
  }

  getInvoiceDetails(invoiceId: number) {
    return this.http.get(this.baseUrl + "/" + invoiceId);
  }

  create(invoiceData: Invoice) {
    return this.http.post(this.baseUrl + "", invoiceData);
  }

  update(invoiceId: number, invoiceData: Invoice) {
    return this.http.put(this.baseUrl + "/" + invoiceId, invoiceData);
  }

  deleteAddress(invoiceId: number) {
    return this.http.delete(this.baseUrl + "/" + invoiceId);
  }
}
