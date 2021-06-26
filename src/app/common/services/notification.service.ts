import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

import { Plugins } from '@capacitor/core';
const { Toast } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private toastController: ToastController) { }


  public async showNotification(message: string="Something went wrong.") {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }
}
