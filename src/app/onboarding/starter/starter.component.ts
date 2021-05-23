import { formatDate } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Address } from 'src/app/common/models/address';
import { BusinessDetails } from 'src/app/common/models/business';
import { Httpresponse } from 'src/app/common/models/httpresponse.model';
import { User, UserDetails } from 'src/app/common/models/user';
import { AddressService } from 'src/app/common/services/http/address.service';
import { BusinessService } from 'src/app/common/services/http/business.service';
import { BusinessservicesService } from 'src/app/common/services/http/businessservice.service';
import { UserService } from 'src/app/common/services/http/user.service';
import { NotificationService } from 'src/app/common/services/notification.service';
import { StorageService } from 'src/app/common/services/storage.service';
import { StoredUserService } from 'src/app/common/services/storeduser.service';
import { isEmpty } from 'src/app/common/utils/utils';

@Component({
  selector: 'app-starter',
  templateUrl: './starter.component.html',
  styleUrls: ['./starter.component.scss'],
})
export class StarterComponent implements OnInit {


  user: User;

  isComplete: boolean = false;

  registrationSteps = [
    {
      id: "1",
      name: "Business Profile"
    },
    {
      id: "2",
      name: "Contact Details"
    },
    {
      id: "3",
      name: "Address Details"
    },
    {
      id: "4",
      name: "Service Configurations"
    },
    {
      id: "5",
      name: "Payment"
    },

  ]
  currentStage: string;

  isLinear = true;
  storedBusData;
  businessData: BusinessDetails;
  contactData;
  addressData: Address;
  serviceData;
  paymentData;


  constructor(
    private router: Router,
    private notificationService: NotificationService,
    private businessService: BusinessService,
    private storageService: StorageService,
    private storedUserService: StoredUserService,
    private businessservicesservice: BusinessservicesService,
    private addressService: AddressService,
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.currentStage = "0";
    this.storedUserService.getUser().then((user) => {
      this.user = user;
      this.userService.getUserDetails(this.user.userId).subscribe((userDataResponse: Httpresponse) => {
        if (userDataResponse.status) {
          let userData: UserDetails = userDataResponse.data[0];
          this.storageService.getData("busData").then((busData) => {
            this.storedBusData = busData;
            if (this.storedBusData.verificationDate == null) {
              this.currentStage = "6";
            }
            if (this.storedBusData.businessSubscriptionDate == null) {
              this.currentStage = "5";
            }
            if (this.storedBusData.serviceConfigured == 0) {
              this.currentStage = "4";
            }
            if (this.storedBusData.addressRegistered == 0) {
              this.currentStage = "3";
            }
            if (isEmpty(this.storedBusData.primaryMobile) && isEmpty(this.storedBusData.primaryEmail)) {
              this.currentStage = "2";
            }
            if (isEmpty(this.storedBusData.businessCode)) {
              this.currentStage = "1";
            }
            if (userData.userIsPrimaryEmailVerified != '2') {
              this.currentStage = "0";
            }
          })
        } else {
          this.notificationService.showNotification("Invalid user.");
        }
      })
    })

  }

  onEmailVerified(data) {
    this.goForward();
  }

  onBusinessSubmit(createBusinessProfile) {
    createBusinessProfile.userId = this.user.userId;
    createBusinessProfile.businessIncorporationDate = createBusinessProfile.businessIncorporationDate ? formatDate(new Date(createBusinessProfile.businessIncorporationDate), "d-MM-YYYY", "en-US") : "";
    this.businessData = createBusinessProfile;
    this.goForward();
  }

  onContactSubmit(data) {
    this.contactData = data;
    this.goForward();
  }

  onAddressSubmit(data) {
    this.addressData = data;
    this.goForward();
  }

  onServicesSubmit(data) {
    this.serviceData = data;
    this.onComplete();
  }

  onComplete() {
    if (this.businessData && this.contactData && this.addressData && this.serviceData) {
      this.businessData.businessOfficePhone = this.contactData.businessOfficePhone;
      this.businessService.createBusiness(this.businessData).subscribe((response: Httpresponse) => {
        if (response.status) {
          this.notificationService.showNotification("Business created.");
        } else {
          console.log(response.error);
        }
      })

      this.userService.updateUser(this.user.userId, this.contactData).subscribe((response: Httpresponse) => {
        if (response.status) {
          this.notificationService.showNotification("Profile updated.");
        } else {
          console.log(response.error);
        }
      })

      this.addressData.userId = this.user.userId;
      this.addressService.createAddress(this.addressData).subscribe((response: Httpresponse) => {
        if (response.status) {
          this.notificationService.showNotification("Address created.");
        } else {
          console.log(response.error);
        }
      })

      this.businessservicesservice.createMultipleBusinessservice(this.serviceData).subscribe((data: Httpresponse) => {
        if (data.status) {
          this.notificationService.showNotification("Service created.");
        } else {
          console.log(data.error);
        }
      })
      this.goForward();
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
    if (this.currentStage != '1') {
      this.currentStage = "" + (parseInt(this.currentStage) - 1);
    }
  }

  goForward() {
    if (parseInt(this.currentStage) < this.registrationSteps.length)
      this.currentStage = "" + (parseInt(this.currentStage) + 1);
  }
}

