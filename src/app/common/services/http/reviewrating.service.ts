import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Reviewrating, ReviewratingFilter } from '../../models/reviewratings.model';
import { Tender, TenderFilter } from '../../models/tenders.model';
import { isEmpty, jsonToQueryString } from '../../utils/utils';


@Injectable({
  providedIn: 'root'
})
export class ReviewRatingService {

  baseUrl = environment.apiBaseUrl + 'reviewratings';

  constructor(private http: HttpClient) {
  }

  getAll(queryParams: ReviewratingFilter) {
    let urlQueryParams = "";
    if (!isEmpty(queryParams)) {
      urlQueryParams = jsonToQueryString(queryParams)
    }
    return this.http.get(this.baseUrl + urlQueryParams);

  }

  getDetails(id: number) {
    return this.http.get(this.baseUrl + "/" + id);
  }

  create(detailData: Reviewrating) {
    return this.http.post(this.baseUrl + "", detailData);
  }

  update(id: number, detailData: Reviewrating) {
    return this.http.put(this.baseUrl + "/" + id, detailData);
  }

  delete(id: number) {
    return this.http.delete(this.baseUrl + "/" + id);
  }
}
