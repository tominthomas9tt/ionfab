import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Httpresponse } from 'src/app/common/models/httpresponse.model';
import { ServiceCategory } from 'src/app/common/models/servicecategory';
import { ServiceFilterParams, Services } from 'src/app/common/models/services';
import { ServicecategoriesService } from 'src/app/common/services/http/servicecategory.service';
import { ServicesService } from 'src/app/common/services/http/services.service';

@Component({
  selector: 'app-serviceaddmodal',
  templateUrl: './serviceaddmodal.component.html',
  styleUrls: ['./serviceaddmodal.component.scss'],
})
export class ServiceaddmodalComponent implements OnInit {
  businessServiceForm: FormGroup;

  serviceCategories: [ServiceCategory];
  services: [Services];
  subServices: [Services];

  selectedCategory = null;
  selectedService = null;
  selectedSubService = null;

  showSubServiceForm: boolean = false;

  constructor(public modalController: ModalController,
    private formBuilder: FormBuilder,
    private serviceCategoryService: ServicecategoriesService,
    private servicesService: ServicesService) { }

  ngOnInit() {
    this.getServiceCategories();

    this.businessServiceForm = this.formBuilder.group({
      name: ['',],
      subService: [''],
      service: ['', Validators.required],
      serviceCategory: ['', Validators.required],
      description: ['',],
    });
  }

  getServiceCategories() {
    this.serviceCategoryService.getAllServiceCategories().subscribe((data: Httpresponse) => {
      if (data.status) {
        this.serviceCategories = data.data;
      }
    })
  }

  onCategoryChanged() {
    this.businessServiceForm.patchValue({ service: null, subService: null });
    this.selectedCategory = this.businessServiceForm.get('serviceCategory').value;
    if (this.selectedCategory && this.selectedCategory.id) {
      this.getServices({ serviceCategoryId: this.selectedCategory.id });
      this.businessServiceForm.patchValue({ service: null });
    }
  }

  getServices(params?: ServiceFilterParams) {
    this.servicesService.getAllServices(params).subscribe((data: Httpresponse) => {
      if (data.status) {
        this.services = data.data;
      }
    })
  }

  onServiceSelected() {
    this.businessServiceForm.patchValue({ subService: null });
    this.selectedService = this.businessServiceForm.get('service').value;
    if (this.selectedService && this.selectedService.hasChildren) {
      this.getSubServices({ serviceCategoryId: this.selectedCategory.id, parentServiceId: this.selectedService.id });
      this.showSubServiceForm = true;
    } else {
      this.showSubServiceForm = false;
    }
  }

  getSubServices(params?: ServiceFilterParams) {
    this.servicesService.getAllServices(params).subscribe((data: Httpresponse) => {
      if (data.status) {
        this.subServices = data.data;
      }
    })
  }

  onSubServiceSelected() {
    this.selectedSubService = this.businessServiceForm.get('subService').value;
  }

  addService() {
    let serviceData = {
      name: this.businessServiceForm.get('name').value,
      category: this.selectedCategory,
      service: this.selectedService,
      subService: this.selectedSubService,
      description: this.businessServiceForm.get('description').value
    };
    this.modalController.dismiss(serviceData);
  }

  dismiss() {
    this.modalController.dismiss(false);
  }
}
