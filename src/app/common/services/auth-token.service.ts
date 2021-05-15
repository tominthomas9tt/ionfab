import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';

const TOKEN_KEY = "user-tokens";

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  authToken: any;

  constructor(private storageService: StorageService) { }

  public async get(): Promise<any> {
    try {
      this.authToken = await this.storageService.getData(TOKEN_KEY)
    } catch (error) {
      console.log(error);
    }
    return this.authToken;
  }

  public set(authToken: string) {
    let result = false;;
    try {
      if (this.storageService.setData(TOKEN_KEY, authToken)) {
        result = true;
      }
    } catch (error) {
      console.log(error);
    }
    return result;
  }

}
