import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Address } from 'src/app/common/models/address';
import { Httpresponse } from 'src/app/common/models/httpresponse.model';
import { StoreService } from 'src/app/common/services/local/store.service';
import { AddressService } from '../address.service';
import { ModifyComponent } from '../modify/modify.component';

@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.component.html',
  styleUrls: ['./addresses.component.scss'],
})
export class AddressesComponent implements OnInit {

  addresses;

  constructor(
    private STORE: StoreService,
    private modalController: ModalController,
    private addressService: AddressService
  ) { }

  ngOnInit() {
    this.getAllAddresses();
  }


  getAllAddresses() {
    this.addressService.getAllAddresses();
    this.addressService.addressesSource.subscribe((data) => {
      this.addresses = data;
    });
  }

  async modifyAddress(editAddress = false) {
    const modal = await this.modalController.create({
      component: ModifyComponent,
      cssClass: '',
      componentProps: {
        addressEditing: editAddress
      }
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    if (data) {
    }
  }

  markAddressAsPrimary(address: Address) {
    let addressData = { isPrimary: 2 };
    this.addressService.updateAddress(address.addressId, addressData).subscribe((response: Httpresponse) => {
      if (response.status) {
        this.shareDefaultAddress(address);
        this.addressService.notify("Default address updated.");
        this.getAllAddresses();
      } else {
        this.addressService.notify();
        console.log(response.error);
      }
    })
  }

  shareDefaultAddress(address) {
    this.STORE.setDefaultAddress(address).then((data) => {
    });
  }

  deleteAddress(address: Address) {
    this.addressService.deleteAddress(address.addressId).subscribe((response: Httpresponse) => {
      if (response.status) {
        this.addressService.notify("Address deleted.");
        this.getAllAddresses();
      } else {
        this.addressService.notify();
        console.log(response.error);
      }
    })
  }

  dismiss(data = false) {
    this.modalController.dismiss(data);
  }

}
