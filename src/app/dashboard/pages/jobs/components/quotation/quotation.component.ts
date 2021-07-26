import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Httpresponse } from 'src/app/common/models/httpresponse.model';
import { QuotationService } from 'src/app/common/services/http/quotations.service';

@Component({
  selector: 'app-quotation',
  templateUrl: './quotation.component.html',
  styleUrls: ['./quotation.component.scss'],
})
export class QuotationComponent implements OnInit {

  @Input() metaData;
  selectedQuotation;

  constructor(
    private modalController: ModalController,
    private quotationService: QuotationService,
  ) { }

  ngOnInit() {
    if (this.metaData) {
      this.getQuotationDetails()
    }
  }

  getQuotationDetails() {
    this.quotationService.getDetails(this.metaData?.id).subscribe((dataResponse: Httpresponse) => {
      if (dataResponse.status) {
        this.selectedQuotation = dataResponse.data[0];
      }
    })
  }

  dismiss(data: any) {
    this.modalController.dismiss(data);
  }

}
