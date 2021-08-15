import { Component, OnInit } from '@angular/core';
import { ServicecategoriesService } from 'src/app/common/services/hybid/servicecategory.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  serviceCategories;


  constructor(
    private serviceCategoryService: ServicecategoriesService
  ) { }

  ngOnInit() {
    this.getAllServices();
  }

  getAllServices() {
    this.serviceCategories = this.serviceCategoryService.getAllLocalServiceCategories(false);
  }
}
