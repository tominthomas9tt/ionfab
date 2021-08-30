import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Httpresponse } from 'src/app/common/models/httpresponse.model';
import { ServicesService } from 'src/app/common/services/http/services.service';
import { BannerService } from 'src/app/common/services/hybid/banner.service';
import { ServicecategoriesService } from 'src/app/common/services/hybid/servicecategory.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss'],
})
export class ServicesComponent implements OnInit {

  serviceCategoryId;
  serviceCategoryDetails;
  bannerDetails;
  services;

  isLoading = false;

  constructor(
    private router: Router,
    private activatedRoutes: ActivatedRoute,
    private serviceCategoryService: ServicecategoriesService,
    private bannerService: BannerService,
    private servicesService: ServicesService
  ) { }

  ngOnInit() {
    this.activatedRoutes.paramMap.subscribe(params => {
      this.serviceCategoryId = parseInt(params.get('id'));
      this.getBannerDetails();
      this.getServiceCategoryDetails();
      this.getAllServices();
    });
  }

  getBannerDetails() {
    if (this.serviceCategoryId) {
      this.bannerDetails = this.bannerService.getByIdLocal(this.serviceCategoryId);
    }
  }

  getServiceCategoryDetails() {
    if (this.serviceCategoryId) {
      this.serviceCategoryDetails = this.serviceCategoryService.getLocalSeriveCategoryById(this.serviceCategoryId);
    }
  }

  getAllServices() {
    this.isLoading = true;
    this.servicesService.getAllServices({ parentServiceId: 0, serviceCategoryId: this.serviceCategoryId }).subscribe((dataResponse: Httpresponse) => {
      if (dataResponse.status) {
        this.services = dataResponse.data;
      } else {
        console.log(dataResponse.error)
      }
      this.isLoading = false;
    })
  }

  proceedWithService(service) {
    let navigationExtras: NavigationExtras = {
      state: {
        categoryId: this.serviceCategoryId,
        serviceId: service.id
      }
    };
    this.router.navigate(['/general/index'], navigationExtras);
  }

}
