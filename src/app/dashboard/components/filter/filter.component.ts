import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Httpresponse } from 'src/app/common/models/httpresponse.model';
import { ServicesService } from 'src/app/common/services/http/services.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {

  @Input() serviceCategory;
  @Input('selectedSubService1') selectedSubService1;
  @Output() filterChangedEmitter = new EventEmitter();

  view = 'remove';

  subcategories;
  selectedSubService;

  constructor(
    private servicesService: ServicesService
  ) { }

  ngOnInit() {
  }

  ngOnChanges() {
    this.getAllServices();
  }

  getAllServices() {
    this.servicesService.getAllServices({ serviceCategoryId: this.serviceCategory?.id, parentServiceId: 0 }).subscribe((dataResponse: Httpresponse) => {
      if (dataResponse.status) {
        this.subcategories = dataResponse.data;
        if(this.selectedSubService1){
          // this.selectedSubService = this.selectedSubService1;
          let serv = this.subcategories.find(item => item.id == this.selectedSubService1.id);
          this.selectedSubService = serv;
        }
        else{
          this.onfilterChange(this.subcategories[0]);
        }
      }
    });
  }

  onfilterChange(data) {
    this.selectedSubService = data;
    this.filterChangedEmitter.emit(data)
  }

  toggleView() {
    if (this.view == "remove") {
      this.view = "add"
    } else {
      this.view = "remove";
    }
  }

}
