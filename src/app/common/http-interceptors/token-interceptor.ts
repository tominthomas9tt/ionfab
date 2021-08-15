import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, throwError } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { Httpresponse } from '../models/httpresponse.model';
import { TokenService } from '../services/local/auth-token.service';
import { AuthService } from '../services/local/auth.service';
import { NotificationService } from '../services/local/notification.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {


    constructor(
        private tokenService: TokenService,
        private notificationService: NotificationService,
        private authService: AuthService) {
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
                                let response: Httpresponse = event.body;
                                if (!response.status) {
                                    const errors = response.error;
                                    let errorMessage = "Something went wrong.";
                                    if (errors && errors.length > 0) {
                                        errorMessage = "";
                                        errors.forEach(error => {
                                            if (error.errorCode == "401") {
                                                this.notificationService.showNotification("Please login again to continue");
                                                this.authService.signOut();
                                            }
                                            errorMessage += error.errorMessage;
                                        });
                                    }
                                } else {
                                    return event
                                }
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