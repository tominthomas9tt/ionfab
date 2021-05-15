import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginUserCredential } from '../../models/loginusercredential';
import { ForgotUser } from '../../models/resetpassword';
import { SignupUser } from '../../models/signupuser';

@Injectable({
  providedIn: 'root'
})
export class ServerAuthService {

  usersUrl = environment.apiBaseUrl + 'auth';

  constructor(private http: HttpClient) {
  }

  getUsers(loginUserCredentials: LoginUserCredential) {
    return this.http.post(this.usersUrl + "/login", loginUserCredentials);
  }

  createUser(signupUser: SignupUser) {
    return this.http.post(this.usersUrl + "/signup", signupUser);
  }

  forgotPassword(forgotPasswordUser: ForgotUser) {
    return this.http.post(this.usersUrl + "/forgotpassword", forgotPasswordUser);
  }


}
