import { Component, OnInit } from '@angular/core';
import { MapService } from 'src/app/common/services/google/map.service';
import { ServicecategoriesService } from 'src/app/common/services/hybid/servicecategory.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  serviceCategories;


  constructor(
    private googleMapService: MapService,
    private serviceCategoryService: ServicecategoriesService
  ) { }

  ngOnInit() {
    this.getAllServices();
    this.getLoca();
  }

  getAllServices() {
    this.serviceCategories = this.serviceCategoryService.getAllLocalServiceCategories(false);
  }

  getLoca() {
    this.googleMapService.getLatLongFromAddress({ address: "vadakkel,Perumballoor p.o, muvattupuzha" }).subscribe((dataResponse) => {
      console.log(dataResponse);
    })
  }
}
