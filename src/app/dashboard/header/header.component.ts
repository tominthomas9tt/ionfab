import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, PopoverController } from '@ionic/angular';
import { AccountMenuComponent } from '../components/account-menu/account-menu.component';
import { SearchComponent } from '../components/search/search.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  constructor(
    private modalController: ModalController,
    private popoverController: PopoverController,
    private router: Router
  ) { }

  ngOnInit() { }

  async presentSearchModal() {
    const modal = await this.modalController.create({
      component: SearchComponent,
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
      component: AccountMenuComponent,
      cssClass: 'my-account-menu-class',
      mode: 'md',
      backdropDismiss: true,
      showBackdrop: false,
      translucent: true
    });
    await popover.present();

    const { data } = await popover.onDidDismiss();
  }

  navigateHome() {
    this.router.navigate(['/', 'dashboard']);
  }
}
