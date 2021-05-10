import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { User } from 'src/app/models/user';

import { Storage } from '@ionic/storage-angular';
import { filter } from 'rxjs/operators';
import { Router } from '@angular/router';

const TOKEN_KEY = "user-access-token";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: Observable<any>
  private authState = new BehaviorSubject(null);

  constructor(private storage: Storage, private router: Router) {
    this.loadUser();
    this.user = this.authState.asObservable().pipe(filter(response => response));
  }

  loadUser() {
    this.storage.get(TOKEN_KEY).then(data => {
      if (data) {
        this.authState.next(data)
      } else {
        this.authState.next({ email: null, password: null });
      }
    })
  }

  signIn(credential: User): Observable<any> {
    let user = null;
    if (credential.email == "username" && credential.password == "password") {
      user = { email: credential.email, role: "User" };
    }
    this.authState.next(user);
    this.storage.set(TOKEN_KEY, user);
    return of(user);
  }

  async signOut() {
    await this.storage.set(TOKEN_KEY, null);
    this.authState.next(null);
    this.router.navigateByUrl("/login");
  }
}
