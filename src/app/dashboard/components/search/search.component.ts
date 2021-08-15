import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSearchbar, ModalController } from '@ionic/angular';
import { Httpresponse } from 'src/app/common/models/httpresponse.model';
import { ServicesService } from 'src/app/common/services/http/services.service';
import { SearchService } from 'src/app/common/store/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {

  // @ViewChild('searchbar', { static: false }) searchbar: IonSearchbar;
  @ViewChild('search', { static: false }) search: IonSearchbar;

  count = 0;
  services;
  isLoading = false;

  constructor(
    private searchService: SearchService,
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
    this.searchService.newSearchData(service);
    this.dismiss();
  }


  dismiss(data = false) {
    this.modalController.dismiss(data);
  }
}
