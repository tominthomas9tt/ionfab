import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { Constants } from 'src/app/common/configs/index.config';
import { Httpresponse } from 'src/app/common/models/httpresponse.model';
import { Inspection } from 'src/app/common/models/inspections.model';
import { Invoice } from 'src/app/common/models/invoice';
import { PayInitializer } from 'src/app/common/models/payment.model';
import { Quotation } from 'src/app/common/models/quotations.model';
import { Tender } from 'src/app/common/models/tenders.model';
import { Tendervendor } from 'src/app/common/models/tendervendors.model';
import { Workorder } from 'src/app/common/models/workorders.model';
import { InspectionService } from 'src/app/common/services/http/inspection.service';
import { InvoiceService } from 'src/app/common/services/http/invoice.service';
import { QuotationService } from 'src/app/common/services/http/quotations.service';
import { ReviewRatingService } from 'src/app/common/services/http/reviewrating.service';
import { TenderService } from 'src/app/common/services/http/tenders.service';
import { TendervendorService } from 'src/app/common/services/http/tendervendors.service';
import { WorkorderService } from 'src/app/common/services/http/workorders.service';
import { JobStatusService } from 'src/app/common/services/local/jobstatusresolver.service';
import { LocalPaymentService } from 'src/app/common/services/local/localpayment.service';
import { NotificationService } from 'src/app/common/services/local/notification.service';
import { StoredUserService } from 'src/app/common/services/local/storeduser.service';
import { misDateFormatted } from 'src/app/common/utils/utils';
import { QuotationComponent } from '../quotation/quotation.component';
import { ReviewComponent } from '../review/review.component';
import { VendorComponent } from '../vendor/vendor.component';

const WORK_FINAL_TYPE = Constants.PAYMENT_TYPES.WORK_FINAL;

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
  displayedInvoiceColumns: string[] = ['slno', 'docDtlsNo', 'docDtlsDt', 'amount', 'status', 'actions'];

  isLoading = false;

  user;
  status;
  detailData: Tender;
  inspectionVendor: Tendervendor;
  inspectionReport: Inspection;
  readyVendors: Tendervendor[];
  connectedVendors: Tendervendor[];
  quotations: Quotation[];
  selectedQuotation: Quotation;
  workorder: Workorder;
  invoices: Invoice[];
  invoiceDataSource;
  ratingReview;

  constructor(
    private alertController: AlertController,
    private activatedRoutes: ActivatedRoute,
    private invoiceService: InvoiceService,
    private modalController: ModalController,
    private notificationService: NotificationService,
    private paymentService: LocalPaymentService,
    private tenderService: TenderService,
    private inspectionService: InspectionService,
    private storedUserService: StoredUserService,
    private tendervendorService: TendervendorService,
    private quotationService: QuotationService,
    private workorderService: WorkorderService,
    private reviewRataingService: ReviewRatingService,
    private jobStatusService: JobStatusService
  ) { }

  ngOnInit() {
    this.activatedRoutes.paramMap.subscribe(params => {
      this.metaData.id = parseInt(params.get('id'));
      this.setInvoiceSource([]);
      this.getTenderDetails();
      this.getstoredUser();
    });
  }

  getTenderDetails(forceReloads = true) {
    this.isLoading = true;
    this.tenderService.getDetails(this.metaData.id).subscribe((dataResponse: Httpresponse) => {
      if (dataResponse.status) {
        this.detailData = dataResponse.data[0];
        this.statusResolver(this.detailData.status);
        if (forceReloads) {
          this.getInspectionVendor();
          this.getInspectionReport();
          this.getAllReady()
          this.getAllConnections();
          this.getAllQuotations();
          this.getJobQuotation();
          this.getWorkorder();
          this.getReview();
          this.getInvoices();
        }
      } else {
        this.notificationService.showGeneralError("Job not found.")
      }
      this.isLoading = false;
    })
  }

  statusResolver(statusId) {
    this.status = this.jobStatusService.resolve(statusId);
  }

  getstoredUser() {
    this.storedUserService.getUser().then((data) => {
      if (data) {
        this.user = data;
      }
    })
  }

  getInspectionVendor() {
    if (this.detailData.inspectionVendorId) {
      this.tendervendorService.getAll({ tenderId: this.detailData.id, isForInspection: 2, isConnected: 2, status: 2, astatus: 2 }).subscribe((dataResponse: Httpresponse) => {
        if (dataResponse.status) {
          this.inspectionVendor = dataResponse.data[0];
        }
      })
    }
  }

  getInspectionReport() {
    if (this.detailData.inspectionReportId) {
      this.inspectionService.getAll({ tenderId: this.detailData.id, status: 2, astatus: 2 }).subscribe((dataResponse: Httpresponse) => {
        if (dataResponse.status) {
          this.inspectionReport = dataResponse.data[0];
        }
      })
    }
  }

  getAllReady() {
    if (this.detailData?.status == 12) {
      this.tendervendorService.getAll({ tenderId: this.detailData.id, status: 2, astatus: 2 }).subscribe((dataResponse: Httpresponse) => {
        if (dataResponse.status) {
          this.readyVendors = dataResponse.data;
        }
      })
    }
  }

  getAllConnections() {
    if (this.detailData?.status > 12) {
      this.tendervendorService.getAll({ tenderId: this.detailData.id, isConnected: 2, status: 2, astatus: 2 }).subscribe((dataResponse: Httpresponse) => {
        if (dataResponse.status) {
          this.connectedVendors = dataResponse.data;
        }
      })
    }
  }

  getAllQuotations() {
    if (this.detailData?.status >= 13) {
      this.quotationService.getAll({ tenderId: this.detailData.id, status: 2, astatus: 2 }).subscribe((dataResponse: Httpresponse) => {
        if (dataResponse.status) {
          this.quotations = dataResponse.data
        }
      })
    }
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
    if (this.detailData?.status >= 15) {
      this.workorderService.getAll({ tenderId: this.detailData.id, status: 2, astatus: 2 }).subscribe((dataResponse: Httpresponse) => {
        if (dataResponse.status) {
          this.workorder = dataResponse.data[0];
        }
      })
    }
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

  async triggerManualQuotations() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      mode: "md",
      header: 'Get Connected',
      message: 'Are you sure you want to proceed to accept quotations from available vendors?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Confirm',
          handler: () => {
            this._triggerManualQuotations();
          }
        }
      ]
    });
    await alert.present();
  }

  _triggerManualQuotations() {
    this.tenderService.triggerManualConnection(this.detailData.id).subscribe((dataResponse: Httpresponse) => {
      if (dataResponse.status) {
        this.notificationService.showNotification("Started to accept quotations")
        this.getTenderDetails();
      } else {
        console.log(dataResponse.error);
        this.notificationService.showInfoWarning(dataResponse?.infoDtls);
      }
    })
  }


  async acceptQuotation(detailData: Quotation) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      mode: "md",
      header: 'Generate workorder',
      message: `Are you sure you want to generate workorder to ${detailData?.vendorName} against quotation no: ${detailData?.quotationNo} ?`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Confirm',
          handler: () => {
            this._acceptQuotation(detailData);
          }
        }
      ]
    });
    await alert.present();
  }

  _acceptQuotation(detailData: Quotation) {
    this.quotationService.acceptQuotation(detailData.id, { isAccepted: 2 }).subscribe((dataResponse: Httpresponse) => {
      if (dataResponse.status) {
        this.notificationService.showNotification("Quotation accepted.");
        this.getJobQuotation();
        this.selectedQuotation = detailData;
        this.generateWorkorder();
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

  async acceptWorkOrderChanges() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      mode: "md",
      header: 'Accept changes',
      message: `Do you accept with the amount changes quoted by the vendor?`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Accept',
          handler: () => {
            this._acceptWorkOrderChanges();
          }
        }
      ]
    });
    await alert.present();
  }

  _acceptWorkOrderChanges() {
    if (this.workorder) {
      let detailData = this.workorder;
      this.workorderService.acceptWorkOrderChange(detailData.id, { isSuspected: 3 }).subscribe((dataResponse: Httpresponse) => {
        if (dataResponse.status) {
          this.notificationService.showNotification("Work order change accepted.");
          this.getTenderDetails(false);
          this.getWorkorder();
        } else {
          console.log(dataResponse.error);
          this.notificationService.showInfoWarning(dataResponse?.infoDtls);
        }
      })
    }
  }

  async acceptWorkCompletion() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      mode: "md",
      header: 'Accept Work Completion',
      message: `Work has been marked completed by the vedor. Accepting work completion will proceed to invoice generation. Do you want to continue?`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Continue',
          handler: () => {
            this._acceptWorkCompletion();
          }
        }
      ]
    });
    await alert.present();
  }


  _acceptWorkCompletion() {
    if (this.workorder) {
      let detailData = this.workorder;
      this.workorderService.acceptWorkCompletion(detailData.id, { isCompletedAccepted: 2 }).subscribe((dataResponse: Httpresponse) => {
        if (dataResponse.status) {
          this.notificationService.showNotification("Work completion accepted.");
          this.generateInvoice();
          this.getTenderDetails(false);
          this.getWorkorder();
        } else {
          console.log(dataResponse.error);
          this.notificationService.showInfoWarning(dataResponse?.infoDtls);
        }
      })
    }
  }

  generateInvoice() {
    if (this.workorder) {
      this.workorderService.generateInvoice(this.detailData.id, {}).subscribe((dataResponse: Httpresponse) => {
        if (dataResponse.status) {
          this.notificationService.showNotification("Invoice generated");
          this.getTenderDetails();
        } else {
          console.log(dataResponse.error);
          this.notificationService.showGeneralError(dataResponse?.infoDtls);
        }
      })
    }
  }

  getInvoices() {
    this.setInvoiceSource([]);
    this.invoiceService.getAllInvoices({ orderNo: this.detailData.id.toString(), astatus: 2 }).subscribe((dataResponse: Httpresponse) => {
      if (dataResponse.status) {
        this.invoices = dataResponse.data;
        this.setInvoiceSource(this.invoices);
      } else {
        console.log(dataResponse.error);
        this.notificationService.showGeneralError(dataResponse?.infoDtls);
      }
    })
  }

  getReview() {
    this.reviewRataingService.getAll({ tenderId: this.detailData.id }).subscribe((dataResponse: Httpresponse) => {
      if (dataResponse.status) {
        this.ratingReview = dataResponse?.data[0];
      }
    })
  }

  async makePaymentFor(invoice: Invoice) {
    let paymentInfo: PayInitializer = {
      type: invoice?.minvoiceTypeId,
      tbillId: invoice.id,
      name: this.user.userName,
      email: this.user.userUsername,
      amountPayable: invoice.valDtlsTotInvVal,
      referenceNo: invoice.docDtlsNo,
      remarks: invoice?.remarks ?? "",
    };
    this.paymentService.init(paymentInfo).then((data) => {
      if (data.status && data.status == true) {
        this.notificationService.showNotification("Payment successfull");
        if (invoice?.minvoiceTypeId == 2) {
          this.isInspectionPaymentSuccess(data.transactionId);
        }
        if (invoice?.minvoiceTypeId == 4) {
          this.markPaymentComplete();
        }
      }
      this.getInvoices();
    }).catch((error) => {
      console.log(error);
      this.getInvoices();
    })
  }

  isInspectionPaymentSuccess(paymentId: number) {
    let detailData: Tender = {
      status: 10,
      isPaidForInspection: 2,
      inspectionPaymentId: paymentId
    };
    this.tenderService.inspectionPaymentSuccess(this.detailData?.id, detailData).subscribe((dataResponse: Httpresponse) => {
      if (dataResponse.status) {
        this.getTenderDetails(false);
        this.getInvoices();
      }
    })
  }

  markPaymentComplete() {
    this.tenderService.finalPaymentCompleted(this.detailData?.id, {}).subscribe((dataResponse: Httpresponse) => {
      if (dataResponse.status) {
        this.presentRatinReviewWindow();
      }
    })
  }

  dateFormat(date) {
    return misDateFormatted(date, "DD-MM-YYYY hh:mm:ss A")
  }

  setInvoiceSource(data) {
    this.invoiceDataSource = new MatTableDataSource<any>(data);
  }

  async presentRatinReviewWindow() {
    const modal = await this.modalController.create({
      component: ReviewComponent,
      cssClass: '',
      componentProps: {
        tenderDetails: this.detailData,
        workOrder: this.workorder
      }
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    if (data) {
      console.log(data);
      this.getTenderDetails(false);
      this.getReview();
    }
  }

}
