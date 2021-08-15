import { Component, OnInit } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { CustomerMenuComponent } from '../customer-menu/customer-menu.component';
import { LandingSearchServiceComponent } from '../landing-search-service/landing-search-service.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  constructor(
    private modalController: ModalController,
    private popoverController: PopoverController
  ) { }

  ngOnInit() { }

  async presentSearchModal() {
    const modal = await this.modalController.create({
      component: LandingSearchServiceComponent,
      cssClass: '',
      componentProps: {
      }
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    if (data) {
      console.log(data);
    }
  }

  async presentAccountMenu() {
    const popover = await this.popoverController.create({
      component: CustomerMenuComponent,
      cssClass: 'my-account-menu-class',
      mode: 'md',
      backdropDismiss: true,
      showBackdrop: false,
      translucent: true
    });
    await popover.present();

    const { data } = await popover.onDidDismiss();
  }
}
