import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Httpresponse } from 'src/app/common/models/httpresponse.model';
import { BusinessService } from 'src/app/common/services/http/business.service';

@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.scss'],
})
export class VendorComponent implements OnInit {
  @Input() metaData;
  businessDetails;

  constructor(
    private modalController: ModalController,
    private businessService: BusinessService,
  ) { }

  ngOnInit() {
    if (this.metaData) {
      this.getVendorDetails()
    }
  }

  getVendorDetails() {
    this.businessService.getBusinessDetails(this.metaData?.vendorId).subscribe((dataResponse: Httpresponse) => {
      if (dataResponse.status) {
        this.businessDetails = dataResponse.data[0];
      }
    })
  }

  dismiss(data: any) {
    this.modalController.dismiss(data);
  }

}
