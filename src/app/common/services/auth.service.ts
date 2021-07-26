import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

import { filter } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ServerAuthService } from './http/serverauth.service';
import { LoginUserCredential } from '../models/loginusercredential';
import { Httpresponse } from '../models/httpresponse.model';
import { NotificationService } from './notification.service';
import { AuthTokens } from '../models/tokens';
import { StorageService } from './storage.service';
import { Constants } from '../configs/index.config';

const TOKEN_KEY = "user-tokens";
const USER_KEY = "user-data";
const DEFAULT_ADDRESS_STORE = Constants.STORAGES.ADDRESSES.DEFAULT;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: Observable<any>
  private authState = new BehaviorSubject(null);

  constructor(private storage: StorageService, private router: Router, private serverAuthService: ServerAuthService, private notificationService: NotificationService) {
    this.loadUser();
    this.user = this.authState.asObservable().pipe(filter(response => response));
  }

  loadUser() {
    this.storage.getData(USER_KEY).then(data => {
      if (data) {
        this.authState.next(data)
      } else {
        this.authState.next({ userId: null });
      }
    })
  }

  // signIn(credential: LoginUserCredential): Observable<any> {
  //   let user = null;
  //   let tokens: AuthTokens = null;
  //   // this.serverAuthService.getUsers(credential).subscribe((data: Httpresponse) => {
  //   //   if (data.status) {
  //   //     user = data.data[0].user;
  //   //     tokens = { authToken: data.data[0].token, refreshToken: data.data[0].refreshToken };
  //   //     this.storage.set(TOKEN_KEY, tokens);
  //   //     this.storage.set(USER_KEY, user);
  //   //     this.authState.next(user);
  //   //   } else {
  //   //     const errors = data.error;
  //   //     let errorMessage = "Something went wrong.";
  //   //     if (errors && errors.length > 0) {
  //   //       errorMessage = "";
  //   //       errors.forEach(error => {
  //   //         errorMessage += error.errorMessage;
  //   //       });
  //   //     }
  //   //     this.notificationService.showNotification(errorMessage);
  //   //     this.authState.next(user);
  //   //   }
  //   // });

  //   this.serverAuthService.getUsers(credential).subscribe({
  //     next: (data: Httpresponse) => {
  //       if (data.status) {
  //         user = data.data[0].user;
  //         tokens = { authToken: data.data[0].token, refreshToken: data.data[0].refreshToken };
  //         this.storage.setData(TOKEN_KEY, tokens);
  //         this.storage.setData(USER_KEY, user);
  //         this.authState.next(user);
  //       } else {
  //         const errors = data.error;
  //         let errorMessage = "Something went wrong.";
  //         if (errors && errors.length > 0) {
  //           errorMessage = "";
  //           errors.forEach(error => {
  //             errorMessage += error.errorMessage ?? "";
  //           });
  //         }
  //         this.notificationService.showNotification(errorMessage);
  //         this.authState.next(user);
  //       }
  //     }
  //   });
  //   return of(user);

  // }

  signIn(credential: LoginUserCredential) {
    let user = null;
    let tokens: AuthTokens = null;
    this.serverAuthService.getUsers(credential).subscribe((data: Httpresponse) => {
      if (data.status) {
        user = data.data[0].user;
        tokens = { authToken: data.data[0].token, refreshToken: data.data[0].refreshToken };
        this.storage.setData(TOKEN_KEY, tokens);
        this.storage.setData(USER_KEY, user);
        console.log("before true returning" + user);
        return user;
      } else {
        const errors = data.error;
        let errorMessage = "Something went wrong.";
        if (errors && errors.length > 0) {
          errorMessage = "";
          errors.forEach(error => {
            errorMessage += error.errorMessage;
          });
        }
        this.notificationService.showNotification(errorMessage);
        console.log("before false returning");
        return user;
      }
    });
  }

  async signOut() {
    await this.storage.setData(USER_KEY, null);
    await this.storage.setData(TOKEN_KEY, null);
    await this.storage.setData(DEFAULT_ADDRESS_STORE,null);
    this.authState.next(null);
    this.router.navigateByUrl("/login");
  }
}
