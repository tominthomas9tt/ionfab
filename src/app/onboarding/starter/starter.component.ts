import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Address } from 'src/app/common/models/address';
import { BusinessDetails } from 'src/app/common/models/business';
import { Httpresponse } from 'src/app/common/models/httpresponse.model';
import { User } from 'src/app/common/models/user';
import { AddressService } from 'src/app/common/services/http/address.service';
import { BusinessService } from 'src/app/common/services/http/business.service';
import { BusinessservicesService } from 'src/app/common/services/http/businessservice.service';
import { UserService } from 'src/app/common/services/http/user.service';
import { NotificationService } from 'src/app/common/services/notification.service';
import { StorageService } from 'src/app/common/services/storage.service';
import { StoredUserService } from 'src/app/common/services/storeduser.service';
import { isEmpty, misDateFormatted } from 'src/app/common/utils/utils';
import { StepsComponent } from '../steps/steps.component';

@Component({
  selector: 'app-starter',
  templateUrl: './starter.component.html',
  styleUrls: ['./starter.component.scss'],
})
export class StarterComponent implements OnInit {


  user: User;

  isComplete: boolean = false;
  termsAgreed = false;


  registrationSteps = [
    {
      id: 1,
      name: "Business Profile"
    },
    {
      id: 2,
      name: "Contact"
    },
    {
      id: 3,
      name: "Address"
    },
    {
      id: 4,
      name: "Services"
    },
    {
      id: 5,
      name: "Payment"
    },

  ]
  currentStage: number;
  maxStage: number;

  isLinear = true;
  storedBusData;
  businessData;
  contactData;
  addressData;
  serviceData;
  paymentData;


  constructor(
    private router: Router,
    public modalController: ModalController,
    private notificationService: NotificationService,
    private businessService: BusinessService,
    private storageService: StorageService,
    private storedUserService: StoredUserService,
    private businessservicesservice: BusinessservicesService,
    private addressService: AddressService,
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.getStoredUser();
  }

  getStoredUser() {
    this.storedUserService.getUser().then((data) => {
      this.user = data;
      this.getBusinessDetails();
      this.stepDecider();
    })
  }

  getBusinessDetails() {
    this.businessService.getBusinessDetails(this.user.userId).subscribe((dataResponse: Httpresponse) => {
      if (dataResponse.status) {
        let data = dataResponse.data;
        this.businessData = data;
      }
    });
  }

  stepDecider() {
    this.businessService.getBusinessStatus().subscribe((dataResponse: Httpresponse) => {
      if (dataResponse.status) {
        this.storedBusData = dataResponse.data[0];
        if (this.storedBusData.verificationDate == null) {
          this.setCurrentStage(6, true);
        }
        if (this.storedBusData.businessSubscriptionDate == null) {
          this.setCurrentStage(5, true);
        }
        if (this.storedBusData.serviceConfigured == 0) {
          this.setCurrentStage(4, true);
        } else {
        }
        if (this.storedBusData.addressRegistered == 0) {
          this.setCurrentStage(3, true);
        } else {
          this.getAddress();
        }
        if (isEmpty(this.storedBusData.primaryMobile) && isEmpty(this.storedBusData.primaryEmail)) {
          this.setCurrentStage(2, true);
        }
        if (isEmpty(this.storedBusData.businessCode)) {
          this.setCurrentStage(1, true);
        }
      }
    });
  }

  onEmailVerified(data) {
    this.proceedForward();
  }

  getAddress() {
    this.addressService.getAllAddresses(this.user.userId).subscribe((dataResponse: Httpresponse) => {
      if (dataResponse.status) {
        this.addressData = dataResponse.data[0];
      }
    })
  }

  getServices() {
    this.businessservicesservice.getAllBusinessservices(this.user.userId).subscribe((dataResponse: Httpresponse) => {
      if (dataResponse.status) {
        this.serviceData = dataResponse.data;
        console.log(this.serviceData);
      }
    });
  }

  onBusinessSubmit(createBusinessProfile) {
    if (createBusinessProfile) {
      createBusinessProfile.userId = this.user.userId;
      createBusinessProfile.businessIncorporationDate = createBusinessProfile.businessIncorporationDate ? misDateFormatted(createBusinessProfile.businessIncorporationDate, "YYYY-MM-DD") : "";
      if (createBusinessProfile.isUpdation) {
        this.businessService.updateBusiness(this.user.userId, createBusinessProfile).subscribe((response: Httpresponse) => {
          if (response.status) {
            this.businessData = response.data;
            this.notificationService.showNotification("Business updated.");
            this.proceedForward();
          } else {
            console.log(response.error);
            this.notificationService.showNotification("Something went wrong.")
          }
        })
      } else {
        this.businessService.createBusiness(createBusinessProfile).subscribe((response: Httpresponse) => {
          if (response.status) {
            this.businessData = response.data;
            this.notificationService.showNotification("Business created.");
            this.proceedForward();
          } else {
            console.log(response.error);
            this.notificationService.showNotification("Something went wrong.")
          }
        })
      }
    } else {
      this.notificationService.showNotification("Insufficient Data.")
    }
  }

  onContactSubmit(data) {
    this.contactData = data;
    if (this.contactData) {
      this.userService.updateUser(this.user.userId, this.contactData).subscribe((response: Httpresponse) => {
        if (response.status) {
          this.getBusinessDetails();
          this.notificationService.showNotification("Profile updated.");
          this.proceedForward();
        } else {
          console.log(response.error);
          this.notificationService.showNotification("Something went wrong.");
        }
      })
      if (this.contactData.businessOfficePhone) {
        let busOfficeData = { businessOfficePhone: this.contactData.businessOfficePhone };
        this.businessService.updateBusiness(this.user.userId, busOfficeData).subscribe((response: Httpresponse) => {
          if (response.status) {
            this.businessData = response.data;
          } else {
            console.log(response.error);
            this.notificationService.showNotification("Something went wrong.");
          }
        })
      }
    } else {
      this.notificationService.showNotification("Insufficient Data.")
    }
  }

  onAddressSubmit(addressData) {
    if (addressData) {
      if (addressData.isUpdate) {
        this.addressService.updateAddress(addressData.isUpdate, addressData).subscribe((response: Httpresponse) => {
          if (response.status) {
            this.addressData = response.data[0];
            this.notificationService.showNotification("Address updated.");
            this.proceedForward();
          } else {
            console.log(response.error);
            this.notificationService.showNotification("Something went wrong.");
          }
        })
      } else {
        addressData.userId = this.user.userId;
        this.addressService.createAddress(addressData).subscribe((response: Httpresponse) => {
          if (response.status) {
            this.notificationService.showNotification("Address created.");
            this.addressData = response.data[0];
            this.proceedForward();
          } else {
            console.log(response.error);
            this.notificationService.showNotification("Something went wrong.");
          }
        })
      }
    } else {
      this.notificationService.showNotification("Insufficient Data.")
    }
  }

  async openSteps() {
    const modal = await this.modalController.create({
      component: StepsComponent,
      backdropDismiss: false,
      cssClass: '',
      componentProps: {
        registrationSteps: this.registrationSteps,
        currentStage: this.currentStage
      }
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    if (data) {
      if (data && data == true) {
        this.termsAgreed = true;
        console.log(this.termsAgreed);
      }
    }
  }

  ontermsAgreed(data){
    if(data){
      this.termsAgreed=true;
    }
  }

  onServicesSubmit(serviceData) {
    if (serviceData) {
      this.businessservicesservice.createMultipleBusinessservice(serviceData).subscribe((data: Httpresponse) => {
        if (data.status) {
          this.notificationService.showNotification("Service created.");
          this.proceedForward();
        } else {
          console.log(data.error);
          this.notificationService.showNotification("Something went wrong.");
        }
      })
    } else {
      this.notificationService.showNotification("Insufficient Data.")
    }
  }

  onPayment(data) {
    this.paymentData = data;
    this.businessService.markAsPaid(this.user.userId).subscribe((markPaidResponse: Httpresponse) => {
      this.router.navigateByUrl("/onboarding/verification-status", { replaceUrl: true });
    })
  }

  goBack() {
    if (this.currentStage > 1) {
      this.setCurrentStage(this.currentStage - 1);
    }
  }

  goForward() {
    if (this.currentStage < this.registrationSteps.length && (this.currentStage < this.maxStage))
      this.setCurrentStage(this.currentStage + 1);
  }

  proceedForward() {
    if (this.currentStage < this.registrationSteps.length)
      this.setCurrentStage(this.currentStage + 1, true);
  }

  setCurrentStage(stage, setMaxStage = false) {
    this.currentStage = stage;
    if (setMaxStage) {
      this.maxStage = stage;
    }
  }
}

