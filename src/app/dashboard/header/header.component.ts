import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { AccountMenuComponent } from '../components/account-menu/account-menu.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  constructor(private popoverController: PopoverController) { }

  ngOnInit() { }

  onSearchChange(event) {
    console.log(event.detail.value);
  }
  
  async presentAccountMenu() {
    const popover = await this.popoverController.create({
      component: AccountMenuComponent,
      cssClass: 'my-account-menu-class',
      mode:'md',
      backdropDismiss:true,
      showBackdrop:false,
      translucent: true
    });
    await popover.present();

    const { data } = await popover.onDidDismiss();
  }
}
