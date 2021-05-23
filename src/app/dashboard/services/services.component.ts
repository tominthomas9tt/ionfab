import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BusinessserviceRequest, BusinessserviceResponse } from 'src/app/common/models/businessservice';
import { Httpresponse } from 'src/app/common/models/httpresponse.model';
import { ServiceCategory } from 'src/app/common/models/servicecategory';
import { ServiceFilterParams, Services } from 'src/app/common/models/services';
import { User } from 'src/app/common/models/user';
import { BusinessservicesService } from 'src/app/common/services/http/businessservice.service';
import { ServicecategoriesService } from 'src/app/common/services/http/servicecategory.service';
import { ServicesService } from 'src/app/common/services/http/services.service';
import { NotificationService } from 'src/app/common/services/notification.service';
import { StoredUserService } from 'src/app/common/services/storeduser.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss'],
})
export class ServicesComponent implements OnInit {

  user: User;
  businessServices: [BusinessserviceResponse];
  viewMode: number = 1;
  selectedBusinessService: BusinessserviceResponse;
  businessServiceForm: FormGroup;
  serviceCategories: [ServiceCategory];
  services: [Services];

  showSubServiceForm: boolean = false;
  subServices: [Services];

  selectedService: Services;



  constructor(
    private formBuilder: FormBuilder,
    private storedUserService: StoredUserService,
    private businessservicesservice: BusinessservicesService,
    private serviceCategoryService: ServicecategoriesService,
    private servicesService: ServicesService,
    private notificationService: NotificationService
  ) { }

  ngOnInit() {
    this.storedUserService.getUser().then(user => {
      this.user = user;
      this.getAllServices(this.user.userId);
    })

    this.businessServiceForm = this.formBuilder.group({
      name: ['',],
      subServiceId: [''],
      serviceId: ['', Validators.required],
      serviceCategoryId: ['', Validators.required],
      description: ['',],
    });

  }

  getAllServices(userId) {
    this.businessservicesservice.getAllBusinessservices(userId).subscribe((data: Httpresponse) => {
      if (data.status) {
        this.businessServices = data.data;
      }
    })
  }

  switchViewMode(mode: number) {
    this.viewMode = mode;
  }

  addService() {
    this.switchViewMode(2);
    this.getServiceCategories();
  }


  onCategoryChanged() {
    if (this.businessServiceForm.get('serviceCategoryId').value) {
      let serviceCategoryId = this.businessServiceForm.get('serviceCategoryId').value;
      this.getServices({ serviceCategoryId: serviceCategoryId });
    }
  }

  onServiceSelected() {
    let serviceIdIndex = this.businessServiceForm.get('serviceId').value;
    let serviceMain = this.services[serviceIdIndex];
    if (serviceMain && serviceMain.hasChildren) {
      let serviceCategoryId = this.businessServiceForm.get('serviceCategoryId').value;
      this.getSubServices({ serviceCategoryId: serviceCategoryId, parentServiceId: serviceMain.id });
      this.showSubServiceForm = true;
    } else {
      this.showSubServiceForm = false;
    }
  }

  onBusinessServiceCreateSubmit() {
    let businessServiceRequest: BusinessserviceRequest = new BusinessserviceRequest();
    businessServiceRequest.name = this.businessServiceForm.get('name').value;
    businessServiceRequest.serviceCategoryId = this.businessServiceForm.get('serviceCategoryId').value;
    let serviceIdIndex = this.businessServiceForm.get('serviceId').value;
    let serviceMain = this.services[serviceIdIndex];
    if (serviceMain && serviceMain.hasChildren) {
      let subServiceIndex = this.businessServiceForm.get('subServiceId').value;
      let subService = this.subServices[subServiceIndex];
      if (subService && subService.id) {
        businessServiceRequest.serviceId = subService.id;
      } else {
        businessServiceRequest.serviceId = serviceMain.id;

      }
    } else {
      businessServiceRequest.serviceId = serviceMain.id;

    }
    businessServiceRequest.description = this.businessServiceForm.get('description').value;
    businessServiceRequest.businessId = this.user.userId;
    this.businessservicesservice.createBusinessservice(businessServiceRequest).subscribe((data: Httpresponse) => {
      if (data.status) {
        this.notificationService.showNotification("Service created.");
        this.getAllServices(this.user.userId);
        this.switchViewMode(1);
      }
    })
  }

  getServiceCategories() {
    this.serviceCategoryService.getAllServiceCategories().subscribe((data: Httpresponse) => {
      if (data.status) {
        this.serviceCategories = data.data;
      }
    })
  }

  getServices(params?: ServiceFilterParams) {
    this.servicesService.getAllServices(params).subscribe((data: Httpresponse) => {
      if (data.status) {
        this.services = data.data;
      }
    })
  }

  getSubServices(params?: ServiceFilterParams) {
    this.servicesService.getAllServices(params).subscribe((data: Httpresponse) => {
      if (data.status) {
        this.subServices = data.data;
      }
    })
  }



}
