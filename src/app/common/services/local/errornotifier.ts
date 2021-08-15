import { Injectable } from '@angular/core';
import { NotificationService } from './notification.service';

@Injectable({
    providedIn: 'root'
})
export class ErrorNotifier {

    constructor(private notificationService: NotificationService) { }

    public showHttpErrors(errors=[]) {
        let errorMessage = "Something went wrong.";
        if (errors && errors.length > 0) {
            errorMessage = "";
            errors.forEach(error => {
                errorMessage += error.errorMessage;
            });
        }
        this.notificationService.showNotification(errorMessage);
    }
}
