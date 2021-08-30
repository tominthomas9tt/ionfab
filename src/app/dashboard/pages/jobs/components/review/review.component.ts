import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Httpresponse } from 'src/app/common/models/httpresponse.model';
import { Reviewrating } from 'src/app/common/models/reviewratings.model';
import { Tender } from 'src/app/common/models/tenders.model';
import { Workorder } from 'src/app/common/models/workorders.model';
import { ReviewRatingService } from 'src/app/common/services/http/reviewrating.service';
import { NotificationService } from 'src/app/common/services/local/notification.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss'],
})
export class ReviewComponent implements OnInit {

  @Input() tenderDetails: Tender;
  @Input() workOrder: Workorder;

  rate1 = 0;
  rate2 = 0;
  rate3 = 0;
  rate4 = 0;
  rate5 = 0;
  rate6 = 0;
  rateOverall = 0;

  dataForm: FormGroup;

  isSubmitted: boolean = false;
  isSubmitDisabled: boolean = false;

  isLoading = false;

  constructor(
    private formBuilder: FormBuilder,
    private modalController: ModalController,
    private reviewRataingService: ReviewRatingService,
    private notificationService: NotificationService
  ) {
  }

  ngOnInit() {
    console.log(this.tenderDetails);
    this.initiateForm();
  }

  initiateForm() {
    this.isSubmitted = false;
    this.isSubmitDisabled = false;
    this.dataForm = this.formBuilder.group({
      review: ['',]
    });
  }

  newRate1(event) {
    this.rate1 = event;
  }

  newRate2(event) {
    this.rate2 = event;
  }

  newRate3(event) {
    this.rate3 = event;
  }

  newRate4(event) {
    this.rate4 = event;
  }

  newRate5(event) {
    this.rate5 = event;
  }

  newRate6(event) {
    this.rate6 = event;
  }

  calculateOverAll() {
    this.rateOverall = 0;
    this.rateOverall = ((this.rate1 ?? 0) + (this.rate2 ?? 0) + (this.rate3 ?? 0) + (this.rate4 ?? 0) + (this.rate5 ?? 0) + (this.rate6 ?? 0)) / 6;
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.dataForm.valid) {
      this.isLoading = true;
      this.calculateOverAll();
      this.isSubmitDisabled = true;
      let dataFormValue = this.dataForm.value;
      let reviwRating: Reviewrating = {
        businessId: this.workOrder.vendorId,
        userId: this.tenderDetails.userId,
        tenderId: this.tenderDetails.id,
        rateConnectionTime: this.rate1,
        rateServiceDuration: this.rate2,
        rateBehaviour: this.rate3,
        rateService: this.rate4,
        rateExperience: this.rate5,
        rateSatisfaction: this.rate6,
        rateOverall: this.rateOverall,
        review: dataFormValue?.review
      }
      this.reviewRataingService.create(reviwRating).subscribe((dataResponse: Httpresponse) => {
        if (dataResponse.status) {
          this.notificationService.showNotification("Thankyou for your response.");
          this.dismiss(true);
        } else {
          this.notificationService.showNotification(dataResponse?.infoDtls ?? "Failed to post review.");
          this.dismiss(false);
        }
        this.isSubmitDisabled = false;
        this.isLoading = false;
      })
      setTimeout(() => {
        this.isSubmitDisabled = false;
      }, 5000)
    } else {
      return false;
    }
  }

  dismiss(data = false) {
    this.modalController.dismiss(data);
  }
}
