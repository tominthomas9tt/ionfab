import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, throwError } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { TokenService } from '../services/auth-token.service';
import { StorageService } from '../services/storage.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {


    constructor(private storageService: StorageService, private tokenService: TokenService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        return from(this.tokenService.get())
            .pipe(
                switchMap(token => {
                    if (token) {
                        req = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + token.authToken) });
                    }

                    if (!req.headers.has('Content-Type')) {
                        req = req.clone({ headers: req.headers.set('Content-Type', 'application/json') });
                    }

                    return next.handle(req).pipe(
                        map((event: HttpEvent<any>) => {
                            if (event instanceof HttpResponse) {
                                // do nothing for now
                            }
                            return event;
                        }),
                        catchError((error: HttpErrorResponse) => {
                            return throwError(error);
                        })
                    );
                })
            );
    }

}