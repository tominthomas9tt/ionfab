import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Httpresponse } from 'src/app/common/models/httpresponse.model';
import { ServiceFilterParams } from 'src/app/common/models/services';
import { User } from 'src/app/common/models/user';
import { BusinessservicesService } from 'src/app/common/services/http/businessservice.service';
import { ServicesService } from 'src/app/common/services/http/services.service';
import { NotificationService } from 'src/app/common/services/notification.service';
import { StoredUserService } from 'src/app/common/services/storeduser.service';
import { removeArrayItem } from 'src/app/common/utils/utils';
import { ServiceaddmodalComponent } from '../serviceaddmodal/serviceaddmodal.component';
import { TermsandconditionsComponent } from '../termsandconditions/termsandconditions.component';

@Component({
  selector: 'app-servicedetails',
  templateUrl: './servicedetails.component.html',
  styleUrls: ['./servicedetails.component.scss'],
})
export class ServicedetailsComponent implements OnInit {

  @Input() termsAgreed = false;

  user: User;
  selectedServices = [];
  servicesInData;

  @Output() serviceDetailSubmitEvent = new EventEmitter();
  @Output() termsAgreedEvent = new EventEmitter();

  isSubmitDisabled: boolean = false;

  constructor(
    private businessservicesservice: BusinessservicesService,
    private storedUserService: StoredUserService,
    private servicesService: ServicesService,
    public modalController: ModalController,
    private notificationService: NotificationService
  ) { }

  ngOnInit() {
    this.getStoredUser();
    if (!this.termsAgreed) {
      this.openTermsAndConditionsService();
    }
  }

  getStoredUser() {
    this.storedUserService.getUser().then(user => {
      this.user = user;
      this.getServices();
    })
  }

  getServices() {
    this.businessservicesservice.getAllBusinessservices(this.user.userId).subscribe((dataResponse: Httpresponse) => {
      if (dataResponse.status) {
        this.servicesInData = dataResponse.data;
      }
    });
  }

  async openTermsAndConditionsService() {
    const modal = await this.modalController.create({
      component: TermsandconditionsComponent,
      backdropDismiss: false,
      cssClass: '',
      componentProps: {
      }
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    if (data) {
      if (data && data == true) {
        this.termsAgreed = true;
        this.termsAgreedEvent.emit(this.termsAgreed)
      }
    }
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
      data.service.forEach(service => {
        let exists = this.selectedServices.find(function (thisService) { return thisService.service.id === service.id }) !== undefined;
        if (exists) {
        } else {
          if (service.hasChildren > 0) {
            this.servicesService.getAllServices({ serviceCategoryId: data.category.id, parentServiceId: service.id }).subscribe((responseData: Httpresponse) => {
              if (responseData.status) {
                responseData.data.forEach(subService => {
                  let bsData = {
                    name: service.name ?? "",
                    category: data.category,
                    service: service,
                    subService: subService,
                    description: service.description ?? ""
                  }
                  let saved = this.servicesInData?.find(function (thisService) { return thisService.serviceId === subService.id }) !== undefined;
                  if (!saved) {
                    this.selectedServices.push(bsData);
                  }
                });
              }
            })
          } else {
            let bsData = {
              name: service.name ?? "",
              category: data.category,
              service: service,
              description: service.description ?? ""
            }
            let saved = this.servicesInData?.find(function (thisService) { return thisService.serviceId === service.id }) !== undefined;
            if (!saved) {
              this.selectedServices.push(bsData);
            }
          }
        }
      });
      // this.selectedServices.push(data);
    }
  }


  removeService(index) {
    this.selectedServices = removeArrayItem(this.selectedServices, index);
  }

  removeServiceHttp(index) {
    this.businessservicesservice.deleteBusinessservice(this.servicesInData[index].businessServiceId).subscribe((dataResponse: Httpresponse) => {
      if (dataResponse.status) {
        this.servicesInData = removeArrayItem(this.servicesInData, index);
        this.notificationService.showNotification("Service removed.");
      } else {
        this.notificationService.showNotification();
      }
    });
  }

  onBusinessServiceCreateSubmit() {
    this.isSubmitDisabled = true;
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
    setTimeout(() => {
      this.isSubmitDisabled = false;
    }, 5000);
  }
}
