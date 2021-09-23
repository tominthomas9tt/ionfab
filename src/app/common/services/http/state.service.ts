import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { State, StateFilter } from '../../models/states.model';
import { isEmpty, jsonToQueryString } from '../../utils/utils';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  baseUrl = environment.apiBaseUrl + 'states';

  constructor(private http: HttpClient) {
  }

  getAll(queryParams: StateFilter) {
    let urlQueryParams = "";
    if (!isEmpty(queryParams)) {
      urlQueryParams = jsonToQueryString(queryParams)
    }
    return this.http.get(this.baseUrl + urlQueryParams);
  }

  getDetails(id: number) {
    return this.http.get(this.baseUrl + "/" + id);
  }

  create(detailData: State) {
    return this.http.post(this.baseUrl + "", detailData);
  }

  update(id: number, detailData: State) {
    return this.http.put(this.baseUrl + "/" + id, detailData);
  }

  delete(id: number) {
    return this.http.delete(this.baseUrl + "/" + id);
  }
}
