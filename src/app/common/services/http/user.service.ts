import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserDetails } from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  usersUrl = environment.apiBaseUrl + 'users';

  constructor(private http: HttpClient) {
  }

  getUserDetails(userId:number) {
    return this.http.get(this.usersUrl + "/" + userId);
  }

  updateUser(userId: number, userData: UserDetails) {
    return this.http.put(this.usersUrl + "/" + userId, userData);
  }

}
