import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Errorresponse } from '../models/errorresponse.model';
import { Httpresponse } from '../models/httpresponse.model';
import { AuthService } from '../services/auth.service';
import { NotificationService } from '../services/notification.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private notificationService: NotificationService,private authService:AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        console.log("in auth interceptor");

        const authReq = req.clone();

        return next.handle(authReq).pipe(
            map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    let response: Httpresponse = event.body;
                    if (!response.status) {
                        const errors = response.error;
                        let errorMessage = "Something went wrong.";
                        if (errors && errors.length > 0) {
                            errorMessage = "";
                            errors.forEach(error => {
                                if(error.errorCode=="401"){
                                    this.authService.signOut();
                                }
                                errorMessage += error.errorMessage;
                            });
                        }
                        this.notificationService.showNotification(errorMessage);
                    } else {
                        return event
                    }
                }
                return event;
            }),
            catchError((error: HttpErrorResponse) => {
                let data = {};
                data = {
                    errorMessage: error && error.error && error.error.reason ? error.error.reason : '',
                    errorCode: error.status
                };
                console.log(error);
                this.notificationService.showNotification(JSON.stringify(data));
                return throwError(error);
            }));
    }
}
