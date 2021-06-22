import { ɵangular_material_src_cdk_accordion_accordion_a } from '@angular/cdk/accordion';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Address } from 'src/app/common/models/address';
import { Httpresponse } from 'src/app/common/models/httpresponse.model';
import { User } from 'src/app/common/models/user';
import { AddressHttpService } from 'src/app/common/services/http/address.service';
import { NotificationService } from 'src/app/common/services/notification.service';
import { StoredUserService } from 'src/app/common/services/storeduser.service';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  user: User;

  addresses = [];
  private _addresses = new BehaviorSubject<Address[]>(this.addresses);
  readonly addressesSource = this._addresses.asObservable();

  defaultAddress = new Address();
  private _defaultAddress = new BehaviorSubject<Address>(this.defaultAddress);
  addressFetched = new Subject<boolean>();
  isAddressPresent = new Subject<boolean>();
  readonly defaultAddressSource = this._defaultAddress.asObservable();

  constructor(
    private storedUserService: StoredUserService,
    private addressHttpService: AddressHttpService,
    private notificationService: NotificationService
  ) {
    this.storedUserService.getUser().then((data) => {
      this.user = data;
      this.getAllAddresses();
    })
  }

  getAllAddresses(forceReload = true) {
    this.addressHttpService.getAllAddresses(this.user?.userId).subscribe((dataResponse: Httpresponse) => {
      if (dataResponse?.status) {
        if (dataResponse?.data && dataResponse.data.length > 0) {
          this.addresses = dataResponse.data;
          this._addresses.next(this.addresses);
          this.addressFetched.next(true);
          this.getDefaultAddress();
        }
      } else {
        this.isAddressPresent.next(true);
      }
    })
  }

  getDefaultAddress() {
    if (this.addresses && this.addresses.length > 0) {
      this.defaultAddress = this.addresses?.[0];
      this._defaultAddress.next(this.defaultAddress);
      this.addresses.map((address: Address) => {
        if (address.isPrimary && address.isPrimary == '2') {
          this.defaultAddress = address;
          this._defaultAddress.next(this.defaultAddress);
        }
      })
    }
  }

  createAddress(addressData: Address) {
    addressData.userId = this.user?.userId;
    return this.addressHttpService.createAddress(addressData);
  }

  updateAddress(userId, addressData) {
    return this.addressHttpService.updateAddress(userId, addressData);
  }

  deleteAddress(addressId) {
    return this.addressHttpService.deleteAddress(addressId);
  }

  notify(message = "Something went wrong") {
    this.notificationService.showNotification(message);
  }
}
