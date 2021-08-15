import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import Banners from '../../repository/banners';

const banners = Banners;
@Injectable({
  providedIn: 'root'
})
export class BannerService {

  // baseUrl = environment.apiBaseUrl + 'banners';

  constructor(private http: HttpClient) {
  }

  getAllLocal() {
    return banners;
  }

  getByIdLocal(id: number) {
    let banner = banners.find(item => item.id == id);
    return banner;
  }

  // getAll() {
  //   return this.http.get(this.baseUrl);
  // }
}
