import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { User } from 'src/app/common/models/user';
import { StoredUserService } from 'src/app/common/services/storeduser.service';
import { removeArrayItem } from 'src/app/common/utils/utils';
import { ServiceaddmodalComponent } from '../serviceaddmodal/serviceaddmodal.component';

@Component({
  selector: 'app-servicedetails',
  templateUrl: './servicedetails.component.html',
  styleUrls: ['./servicedetails.component.scss'],
})
export class ServicedetailsComponent implements OnInit {

  user: User;
  selectedServices = [];

  @Output() serviceDetailSubmitEvent = new EventEmitter();

  constructor(
    private storedUserService: StoredUserService,
    public modalController: ModalController
  ) { }

  ngOnInit() {
    this.storedUserService.getUser().then(user => {
      this.user = user;
    })

  }

  async openAddNewService() {
    const modal = await this.modalController.create({
      component: ServiceaddmodalComponent,
      cssClass: '',
      componentProps: {
      }
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    if (data) {
      this.selectedServices.push(data);
    }
  }

  removeService(index) {
    this.selectedServices = removeArrayItem(this.selectedServices, index);
  }

  onBusinessServiceCreateSubmit() {
    let servicesConfigured = [];
    this.selectedServices.forEach(service => {
      let bsData = {
        name: service.name ?? "",
        serviceCategoryId: service.category.id,
        serviceId: service.subService?.id ?? service.service.id,
        businessId: this.user.userId,
        description: service.description ?? ""
      }
      servicesConfigured.push(bsData);
    });
    let sendData = {
      businessServices: servicesConfigured
    };
    this.serviceDetailSubmitEvent.emit(sendData);
  }
}
