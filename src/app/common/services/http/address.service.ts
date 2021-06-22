import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Address } from '../../models/address';

@Injectable({
  providedIn: 'root'
})
export class AddressHttpService {

  baseUrl = environment.apiBaseUrl + 'address';

  constructor(private http: HttpClient) {
  }

  getAllAddresses(userId: number) {
    return this.http.get(this.baseUrl + "/user/" + userId);

  }

  getAddressDetails(addressId: number) {
    return this.http.get(this.baseUrl + "/" + addressId);
  }

  createAddress(addressData: Address) {
    return this.http.post(this.baseUrl + "", addressData);
  }

  updateAddress(addressId: number, addressData: Address) {
    return this.http.put(this.baseUrl + "/" + addressId, addressData);
  }

  deleteAddress(addressId: number) {
    return this.http.delete(this.baseUrl + "/" + addressId);
  }
}
