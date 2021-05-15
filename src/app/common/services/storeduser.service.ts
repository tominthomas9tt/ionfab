import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';

const USER_KEY = "user-data";

@Injectable({
  providedIn: 'root'
})
export class StoredUserService {

  constructor(private storage: StorageService,) {
  }

  async getUser() {
    return await this.storage.getData(USER_KEY).then(data => {
      return data;
    })
  }

}
