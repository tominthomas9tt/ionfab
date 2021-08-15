import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Patterns } from 'src/app/common/configs/index.config';
import { Httpresponse } from 'src/app/common/models/httpresponse.model';
import { Pincode, PincodeFilter } from 'src/app/common/models/pincodes.model';
import { PincodeService } from 'src/app/common/services/http/pincodes.service';
import { NotificationService } from 'src/app/common/services/local/notification.service';
import { isEmpty } from 'src/app/common/utils/utils';

const PIN_PATTERN = Patterns.PIN;

@Component({
  selector: 'app-availability-check',
  templateUrl: './availability-check.component.html',
  styleUrls: ['./availability-check.component.scss'],
})
export class AvailabilityCheckComponent implements OnInit {

  dataForm: FormGroup;
  isLoggedin: boolean;

  isSubmitted = false;

  pincode: Pincode;

  vendorsFound = 0;


  constructor(private formBuilder: FormBuilder,
    private pincodeService: PincodeService,
    private router: Router,
    public modalController: ModalController,
    private notificationService: NotificationService) { }

  ngOnInit() {
    this.dataForm = this.formBuilder.group({
      pin: ['', Validators.compose([Validators.required, Validators.pattern(PIN_PATTERN)])]
    });
  }

  get errorControl() {
    return this.dataForm.controls;
  }

  onSubmit() {
    let dataSample = this.dataForm.value;
    let pincodeFilter: PincodeFilter = {
      pincode: dataSample.pin,
      offset: 0,
      limit: 1,
      status: 2,
      astatus: 2
    };
    if (!isEmpty(pincodeFilter)) {
      this.vendorsFound = 0;
      this.pincode = null;
      this.pincodeService.getAll(pincodeFilter).subscribe((dataResponse: Httpresponse) => {
        if (dataResponse.status && dataResponse?.data.length > 0) {
          this.getAvailability();
          this.pincode = dataResponse?.data[0];
        } else {
          this.notificationService.showNotification("Invalid pincode.");
        }
      })
    } else {
      this.notificationService.showNotification("Please enter valid credentials.");
    }
  }

  getAvailability() {
    this.vendorsFound = parseInt((Math.random() * (50 - 20) + 20).toFixed(1));
  }

  signIn() {
    this.router.navigateByUrl("/auth/login", { replaceUrl: true });
  }

  signUp() {
    this.router.navigateByUrl("/auth/sign-up" + ((this.pincode?.pincode) ? "?pincode=" + this.pincode?.pincode : ""));
  }

}
