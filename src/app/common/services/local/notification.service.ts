import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

import { Plugins } from '@capacitor/core';
import { isEmpty } from '../../utils/utils';
const { Toast } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private toastController: ToastController) { }


  public async showNotification(message: string = "Something went wrong. Please try later.") {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }
  public async showGeneralError(message: string = "Something went wrong. Please try later.") {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  public async showInfoWarning(infoDtls) {
    let message = "Something went wrong. Please try later.";
    if (!isEmpty(infoDtls) && infoDtls[0] && infoDtls[0].error) {
      message = infoDtls[0].error;
    }
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }
}
