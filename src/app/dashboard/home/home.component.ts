import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Constants } from 'src/app/common/configs/constants.config';
import { Httpresponse } from 'src/app/common/models/httpresponse.model';
import { ServicecategoriesService } from 'src/app/common/services/http/servicecategory.service';
import { ServicesService } from 'src/app/common/services/http/services.service';
import { StorageService } from 'src/app/common/services/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  items = [];
  isLoading = true;

  selectedCategory;
  selectedSubcategory;
  selectedSubcategory1;

  subServices;
  showSubservices = false;

  vendorsFound = 0;
  
  dataForm: FormGroup;
  isSubmitted: boolean;
  isSubmitDisabled: boolean;

  constructor(
    private serviceCategoryServices: ServicecategoriesService,
    private storageService: StorageService,
    private servicesService: ServicesService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.selectedCategory = this.serviceCategoryServices.getLocalSeriveCategoryById(1);
    this.checkForSelectedService();
    this.generateRandomItem();
    this.initiateForm();
  }

  checkForSelectedService() {
    this.storageService.getData(Constants.SERVICE_SELECTED_STORAGE).then((data) => {
      let selectedService = data;
      if (selectedService.serviceCategoryId) {
        let category = this.serviceCategoryServices.getLocalSeriveCategoryById(selectedService.serviceCategoryId);
        this.onCategoryChanged(category);
      }
      if (selectedService.serviceId) {
        this.servicesService.getServiceById(selectedService.serviceId).subscribe((dataResponse: Httpresponse) => {
          if (dataResponse.status) {
            this.selectedSubcategory1 = dataResponse.data[0];
            this.onFilterChanged(dataResponse.data[0]);
          }
        });
      }
    }).finally(() => {
      this.storageService.deleteData(Constants.SERVICE_SELECTED_STORAGE).then((data) => {
        console.log("service selected cleared.");
      })
    })
  };

  onCategoryChanged(categoryData) {
    this.selectedCategory = categoryData;
    this.selectedSubcategory1 = null;
    this.generateRandomItem();
  }

  onFilterChanged(filterData) {
    this.selectedSubcategory = filterData;
    this.generateRandomItem();
    this.getSubServices();
  }

  getSubServices() {
    let selSubCat = this.selectedSubcategory;
    if (selSubCat?.hasChildren && selSubCat?.hasChildren > 0) {
      this.servicesService.getAllServices({ parentServiceId: this.selectedSubcategory.id }).subscribe((dataResponse: Httpresponse) => {
        if (dataResponse.status && selSubCat.id == this.selectedSubcategory?.id) {
          this.showSubservices = true;
          this.subServices = dataResponse.data
        }
      })
    } else {
      this.showSubservices = false;
    }

  }

  getRandomArbitrary(min, max) {
    return (Math.random() * (max - min) + min).toFixed(1);
  }

  generateRandomItem() {
    this.isLoading = true;

    this.items = [];
    let count = parseInt(this.getRandomArbitrary(20, 50));
    for (let i = 0; i < count; i++) {
      let randomNumber = parseInt(this.getRandomArbitrary(1000, 10000));
      let rating = this.getRandomArbitrary(1, 5);
      this.items.push({
        id: randomNumber,
        name: "Vendor " + randomNumber,
        rating: rating
      })
    }
    this.vendorsFound = count;
    this.isLoading = false;
  }

  initiateForm() {
    this.isSubmitted = false;
    this.isSubmitDisabled = false;
    this.dataForm = this.formBuilder.group({
      serviceSub: [''],
      jobDecription: [''],
    });
  }

  // get errorControl() {
  //   return this.dataForm.controls;
  // }

  onSubmit() {
    this.isSubmitted = true;
    if (this.dataForm.valid) {
      this.isSubmitDisabled = true;
      let tenderData = this.dataForm.value;
      console.log(tenderData);
      setTimeout(() => {
        this.isSubmitDisabled = false;
      }, 5000)
    }
  }

}
