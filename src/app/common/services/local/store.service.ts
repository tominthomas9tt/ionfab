import { Injectable } from '@angular/core';
import { Constants } from '../../configs/index.config';
import { Address } from '../../models/address';

import { StorageService } from './storage.service';
import { StoredUserService } from './storeduser.service';

const DEFAULT_ADDRESS_STORE = Constants.STORAGES.ADDRESSES.DEFAULT;

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor(private storageService: StorageService,
    private storedUserServide: StoredUserService) {
  }

  getUser() {
    return this.storedUserServide.getUser();
  }

  setUser(user) {
    return this.storedUserServide.setUser(user);
  }

  getDefaultAddress() {
    return this.storageService.getData(DEFAULT_ADDRESS_STORE)
  }

  setDefaultAddress(address: Address) {
    return this.storageService.setData(DEFAULT_ADDRESS_STORE, address);
  }
}