import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { isEmpty, jsonToQueryString } from '../../utils/utils';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  apiKey = environment.googleMapApiKey;
  baseUrl = 'https://maps.googleapis.com/maps/api/';

  private httpClient: HttpClient;

  constructor(handler: HttpBackend) {
    this.httpClient = new HttpClient(handler);
  }

  getLatLongFromAddress(queryParams) {
    let urlQueryParams = "";
    queryParams.key = this.apiKey;
    if (!isEmpty(queryParams)) {
      urlQueryParams = jsonToQueryString(queryParams)
    }
    return this.httpClient.get(this.baseUrl + "geocode/json" + urlQueryParams);
  }
}
