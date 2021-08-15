import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonSearchbar, ModalController } from '@ionic/angular';
import { Httpresponse } from 'src/app/common/models/httpresponse.model';
import { ServicesService } from 'src/app/common/services/http/services.service';
import { SearchService } from 'src/app/common/store/search.service';

@Component({
  selector: 'app-landing-search-service',
  templateUrl: './landing-search-service.component.html',
  styleUrls: ['./landing-search-service.component.scss'],
})
export class LandingSearchServiceComponent implements OnInit {

  // @ViewChild('searchbar', { static: false }) searchbar: IonSearchbar;
  @ViewChild('search', { static: false }) search: IonSearchbar;

  count = 0;
  services;
  isLoading = false;

  constructor(
    private router: Router,
    private modalController: ModalController,
    private servicesService: ServicesService
  ) { }

  ngOnInit() {
    this.autoFocus();
  }

  autoFocus(): void {
    setTimeout(() => {
      this.search.setFocus();
    }, 500);
  }

  onSearchChange(event) {
    let name = event.target.value;
    this.getServices(name);
  }

  getServices(name) {
    if (name && name.length > 1) {
      this.isLoading = true;
      this.servicesService.getAllServices({ name: name, status: 2, parentServiceId: 0 }).subscribe((dataResponse: Httpresponse) => {
        if (dataResponse.status) {
          this.services = dataResponse.data;
        } else {
          this.services = [];
        }
        this.isLoading = false;
      })
    }
  }

  sendService(service) {
    this.dismiss();
    this.router.navigate(["services", service?.serviceCategoryId]);
  }


  dismiss(data = false) {
    this.modalController.dismiss(data);
  }
}
