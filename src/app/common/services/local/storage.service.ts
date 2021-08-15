import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage-angular';

import { environment } from 'src/environments/environment';

const prefix = environment.storagePrefix;

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    const storage = await this.storage.create();
    this._storage = storage;
  }

  public async setData(key: string, value: any) {
    let status = true;
    try {
      await this._storage.set(prefix + key, value);
    } catch (error) {
      status = false;
      console.log(error)
    }
    return status;
  }

  public async getData(key: string) {
    let result: any = false;
    try {
      const data = await this._storage.get(prefix + key);
      result = data;
    } catch (error) {
      result = false;
      console.error(error);
    }
    return result;
  }

  public async deleteData(key: string) {
    let status = true;
    try {
      await this._storage.remove(prefix + key);
    } catch (error) {
      status = false;
      console.error(error);
    }
    return status;
  }

  public async clearData() {
    let status = true;
    try {
      await this._storage.clear();
    } catch (error) {
      status = false;
      console.log(error)
    }
    return status;
  }
}