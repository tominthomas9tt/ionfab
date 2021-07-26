import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Httpresponse } from 'src/app/common/models/httpresponse.model';
import { Inspection } from 'src/app/common/models/inspections.model';
import { Quotation } from 'src/app/common/models/quotations.model';
import { Tender } from 'src/app/common/models/tenders.model';
import { Tendervendor } from 'src/app/common/models/tendervendors.model';
import { Workorder } from 'src/app/common/models/workorders.model';
import { InspectionService } from 'src/app/common/services/http/inspection.service';
import { QuotationService } from 'src/app/common/services/http/quotations.service';
import { TenderService } from 'src/app/common/services/http/tenders.service';
import { TendervendorService } from 'src/app/common/services/http/tendervendors.service';
import { WorkorderService } from 'src/app/common/services/http/workorders.service';
import { NotificationService } from 'src/app/common/services/notification.service';
import { misDateFormatted } from 'src/app/common/utils/utils';
import { QuotationComponent } from '../quotation/quotation.component';
import { VendorComponent } from '../vendor/vendor.component';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {

  metaData = {
    id: 0
  };

  title = "Job Details";

  detailData: Tender;
  inspectionVendor: Tendervendor;
  inspectionReport: Inspection;
  connectedVendors: Tendervendor[];
  quotations: Quotation[];
  selectedQuotation: Quotation;
  workorder: Workorder;


  constructor(
    private activatedRoutes: ActivatedRoute,
    private modalController: ModalController,
    private notificationService: NotificationService,
    private tenderService: TenderService,
    private inspectionService: InspectionService,
    private tendervendorService: TendervendorService,
    private quotationService: QuotationService,
    private workorderService: WorkorderService
  ) { }

  ngOnInit() {
    this.activatedRoutes.paramMap.subscribe(params => {
      this.metaData.id = parseInt(params.get('id'));
      this.getTenderDetails();
    });
  }

  getTenderDetails() {
    this.tenderService.getDetails(this.metaData.id).subscribe((dataResponse: Httpresponse) => {
      if (dataResponse.status) {
        this.detailData = dataResponse.data[0];
        this.getInspectionVendor();
        this.getInspectionReport();
        this.getAllConnections();
        this.getAllQuotations();
        this.getJobQuotation();
        this.getWorkorder();
      } else {
        this.notificationService.showGeneralError("Job not found.")
      }
    })
  }

  getInspectionVendor() {
    this.tendervendorService.getAll({ tenderId: this.detailData.id, isForInspection: 2, isConnected: 2, status: 2, astatus: 2 }).subscribe((dataResponse: Httpresponse) => {
      if (dataResponse.status) {
        this.inspectionVendor = dataResponse.data[0];
      }
    })
  }

  getInspectionReport() {
    this.inspectionService.getAll({ tenderId: this.detailData.id, status: 2, astatus: 2 }).subscribe((dataResponse: Httpresponse) => {
      if (dataResponse.status) {
        this.inspectionReport = dataResponse.data[0];
      }
    })
  }

  getAllConnections() {
    this.tendervendorService.getAll({ tenderId: this.detailData.id, isConnected: 2, status: 2, astatus: 2 }).subscribe((dataResponse: Httpresponse) => {
      if (dataResponse.status) {
        this.connectedVendors = dataResponse.data;
      }
    })
  }

  getAllQuotations() {
    this.quotationService.getAll({ tenderId: this.detailData.id, status: 2, astatus: 2 }).subscribe((dataResponse: Httpresponse) => {
      if (dataResponse.status) {
        this.quotations = dataResponse.data
      }
    })
  }

  async viewVendorDetails(vendor) {
    const modal = await this.modalController.create({
      component: VendorComponent,
      cssClass: '',
      backdropDismiss: true,
      componentProps: {
        metaData: vendor
      }
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    if (data) {

    }
  }

  async viewQuotationDetails(quotation: Quotation) {
    const modal = await this.modalController.create({
      component: QuotationComponent,
      cssClass: '',
      backdropDismiss: true,
      componentProps: {
        metaData: quotation
      }
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    if (data) {

    }
  }

  getJobQuotation() {
    this.quotationService.getAll({ tenderId: this.detailData.id, isAccepted: 2, status: 2, astatus: 2 }).subscribe((dataResponse: Httpresponse) => {
      if (dataResponse.status) {
        this.selectedQuotation = dataResponse.data[0]
      }
    })
  }

  getWorkorder() {
    this.workorderService.getAll({ tenderId: this.detailData.id, status: 2, astatus: 2 }).subscribe((dataResponse: Httpresponse) => {
      if (dataResponse.status) {
        this.workorder = dataResponse.data[0];
      }
    })
  }

  startAcceptingQuotations() {
    this.tenderService.update(this.detailData.id, { isOpenToQuote: 2, status: 13 }).subscribe((dataResponse: Httpresponse) => {
      if (dataResponse.status) {
        this.notificationService.showNotification("Started to accept quotations")
        this.getTenderDetails();
      } else {
        console.log(dataResponse.error);
        this.notificationService.showInfoWarning(dataResponse?.infoDtls);
      }
    })
  }

  acceptQuotation(detailData: Quotation) {
    this.quotationService.acceptQuotation(detailData.id, { isAccepted: 2 }).subscribe((dataResponse: Httpresponse) => {
      if (dataResponse.status) {
        this.notificationService.showNotification("Quotation accepted.");
        this.getJobQuotation();
      } else {
        console.log(dataResponse.error);
        this.notificationService.showInfoWarning(dataResponse?.infoDtls);
      }
    })
  }

  generateWorkorder() {
    if (this.selectedQuotation) {
      let detailData = this.selectedQuotation;
      let workorderData: Workorder = {
        quotationId: detailData.id,
        amount: detailData.amount,
        totalAmount: detailData.amount,
        tenderId: detailData.tenderId,
        vendorId: detailData.vendorId,
        userId: this.detailData.userId
      };
      this.workorderService.create(workorderData).subscribe((dataResponse: Httpresponse) => {
        if (dataResponse.status) {
          this.notificationService.showNotification("Workorder has been issued");
          this.getTenderDetails();
        } else {
          console.log(dataResponse.error);
          this.notificationService.showInfoWarning(dataResponse?.infoDtls);
        }
      })
    }
  }

  acceptWorkOrderChanges() {
    if (this.workorder) {
      let detailData = this.workorder;
      this.workorderService.acceptWorkOrderChange(detailData.id, { isSuspected: 3 }).subscribe((dataResponse: Httpresponse) => {
        if (dataResponse.status) {
          this.notificationService.showNotification("Work order change accepted.");
          this.getWorkorder();
        } else {
          console.log(dataResponse.error);
          this.notificationService.showInfoWarning(dataResponse?.infoDtls);
        }
      })
    }
  }

  acceptWorkCompletion() {
    if (this.workorder) {
      let detailData = this.workorder;
      this.workorderService.acceptWorkCompletion(detailData.id, { isCompletedAccepted: 2 }).subscribe((dataResponse: Httpresponse) => {
        if (dataResponse.status) {
          this.notificationService.showNotification("Work completion accepted.");
          this.getWorkorder();
        } else {
          console.log(dataResponse.error);
          this.notificationService.showInfoWarning(dataResponse?.infoDtls);
        }
      })
    }
  }

  dateFormat(date) {
    return misDateFormatted(date, "DD-MM-YYYY hh:mm:ss A")
  }

}
