import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { AddressService } from './address.service';
import { AddressesComponent } from './addresses/addresses.component';
import { ModifyComponent } from './modify/modify.component';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss'],
})
export class AddressComponent implements OnInit {

  defaultAddress;
  subscription: Subscription;
  isAddressPresentsubscription: Subscription;

  constructor(
    private modalController: ModalController,
    private addressService: AddressService
  ) {
  }

  ngOnInit() {
    this.initiateValues();
  }

  initiateValues() {
    this.subscription = this.addressService.addressFetched
      .subscribe(
        (data) => {
          this.getDefaultAddress();
        }
      )
    this.isAddressPresentsubscription = this.addressService.isAddressPresent.subscribe((data) => {
      if (data) {
        this.addressService.notify("Create a service address to continue.")
        this.modifyAddress();
      }
    })
  }

  getDefaultAddress() {
    this.addressService.getDefaultAddress();
    this.addressService.defaultAddressSource.subscribe((data) => {
      this.defaultAddress = data;
    });
  }

  async openAddresses() {
    const modal = await this.modalController.create({
      component: AddressesComponent,
      cssClass: '',
      componentProps: {
      }
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    if (data) {
    }
  }

  async modifyAddress(editAddress = false) {
    const modal = await this.modalController.create({
      backdropDismiss: false,
      component: ModifyComponent,
      cssClass: '',
      componentProps: {
        addressEditing: editAddress,
        isDismissable: false
      }
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    if (data) {
    }
  }
}
