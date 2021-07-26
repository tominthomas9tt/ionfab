import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Patterns } from 'src/app/common/configs/index.config';
import { Address } from 'src/app/common/models/address';
import { Httpresponse } from 'src/app/common/models/httpresponse.model';
import { Pincode, PincodeFilter } from 'src/app/common/models/pincodes.model';
import { SignupUser } from 'src/app/common/models/signupuser';
import { AuthService } from 'src/app/common/services/auth.service';
import { ErrorNotifier } from 'src/app/common/services/errornotifier';
import { PincodeService } from 'src/app/common/services/http/pincodes.service';
import { ServerAuthService } from 'src/app/common/services/http/serverauth.service';
import { NotificationService } from 'src/app/common/services/notification.service';
import { StorageService } from 'src/app/common/services/storage.service';
import { StoredUserService } from 'src/app/common/services/storeduser.service';
import { isEmpty } from 'src/app/common/utils/utils';
import { AddressService } from 'src/app/dashboard/components/address/address.service';
import { TermsandconditionsComponent } from '../termsandconditions/termsandconditions.component';

const PIN_PATTERN = Patterns.PIN;

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  isLoggedin: boolean;

  pincodeIn;
  pincode: Pincode;

  isSubmitted = false;

  agreementAccepted = false;

  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';

  user: SignupUser = {
    userName: "",
    userRoleId: "",
    userUsername: "",
    userPrimaryPhone: "",
    userPassword: "",
  };

  constructor(private formBuilder: FormBuilder,
    private pincodeService: PincodeService,
    private serverauth: ServerAuthService,
    private route: ActivatedRoute,
    private router: Router,
    public modalController: ModalController,
    private storedUser: StoredUserService,
    private errorNotifier: ErrorNotifier,
    private notificationService: NotificationService) { }

  ngOnInit() {
    this.pincodeIn = this.route.snapshot.queryParamMap.get('pincode');

    this.signupForm = this.formBuilder.group({
      userName: ['', Validators.required],
      userUsername: ['', Validators.compose([Validators.required, Validators.email])],
      userPrimaryPhone: ['', Validators.compose([Validators.required, Validators.pattern(Patterns.PHONENO)])],
      userPassword: ['', Validators.required],
      agreeTerms: [],
      addressline1: ['', Validators.required],
      addressline2: ['',],
      landmark: ['',],
      street: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      pin: ['', Validators.compose([Validators.required, Validators.pattern(PIN_PATTERN)])]
    });
    if (this.pincodeIn) {
      this.signupForm.patchValue({
        pin: this.pincodeIn
      })
    }
    this.getPincodeDetails(this.pincodeIn);
  }

  hideShowPassword() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }

  pincodeChanged() {
    let pincode = this.signupForm.get('pin').value;
    this.getPincodeDetails(pincode);
  }

  getPincodeDetails(pincode) {
    if (!isEmpty(pincode) && pincode.toString().length == 6 && pincode != this.pincode?.pincode) {
      let pincodeFilter: PincodeFilter = {
        pincode: pincode,
        offset: 0,
        limit: 1,
        status: 2,
        astatus: 2
      };
      if (!isEmpty(pincodeFilter)) {
        this.pincodeService.getAll(pincodeFilter).subscribe((dataResponse: Httpresponse) => {
          if (dataResponse.status && dataResponse?.data.length > 0) {
            this.pincode = dataResponse?.data[0];
            this.signupForm.patchValue({
              street: this.pincode.taluk,
              city: this.pincode.district,
              state: this.pincode.state,
            })
          } else {
            this.notificationService.showNotification("Invalid pincode.");
          }
        })
      }
    }
  }

  async openTermsAndConditionsService() {
    const modal = await this.modalController.create({
      component: TermsandconditionsComponent,
      backdropDismiss: false,
      cssClass: '',
      componentProps: {
      }
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    if (data) {
    }
  }

  get errorControl() {
    return this.signupForm.controls;
  }

  onAgreementAccepted() {
    this.agreementAccepted = false;
    if (this.signupForm.get('agreeTerms').value == true) {
      this.agreementAccepted = true;
    }
  }

  onSubmit() {
    this.user = this.signupForm.value;
    this.user.isPrimary = "2";
    if (!isEmpty(this.user.userName) && !isEmpty(this.user.userUsername) && !isEmpty(this.user.userPassword)) {
      this.user.userRoleId = "7";
      this.serverauth.createUser(this.user).subscribe((responseData: Httpresponse) => {
        if (responseData.status) {
          let user = responseData.data[0];
          this.storedUser.setUser(user).then((data) => {
            this.notificationService.showNotification("User created.");
            this.router.navigateByUrl("/auth/verify-user");
          })
        } else {
          this.errorNotifier.showHttpErrors(responseData.error);
        }
      });
    } else {
      this.notificationService.showNotification("Please enter valid credentials.");
    }
  }

}
