import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../common/services/auth.service';

import { take, map } from 'rxjs/operators';
import { StorageService } from '../common/services/storage.service';
import { isEmpty } from '../common/utils/utils';

const USER_KEY = "user-data";


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  canProceed: boolean = false;

  constructor(
    public router: Router, private authService: AuthService, private storageService: StorageService) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.storageService.getData(USER_KEY).then(
      (user) => {
        if (!isEmpty(user)) {
          return true;
        }
        else {
          return this.router.parseUrl('/auth/login');
        }
      }
    );
    // return this.authService.user.pipe(
    //   take(1),
    //   map(user => {
    //     if (user && user.userId != null) {
    //       return true;
    //     } else {
    //       return this.router.parseUrl('/auth/login');
    //     }
    //   })
    // )
  }

}
