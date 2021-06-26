import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Httpresponse } from 'src/app/common/models/httpresponse.model';
import { AuthService } from 'src/app/common/services/auth.service';
import { ServerAuthService } from 'src/app/common/services/http/serverauth.service';
import { NotificationService } from 'src/app/common/services/notification.service';
import { StorageService } from 'src/app/common/services/storage.service';
import { StoredUserService } from 'src/app/common/services/storeduser.service';

@Component({
  selector: 'app-verifyemail',
  templateUrl: './verifyemail.component.html',
  styleUrls: ['./verifyemail.component.scss'],
})
export class VerifyemailComponent implements OnInit {

  user;
  mailForm: FormGroup;
  otpForm: FormGroup;
  email = "";

  showEmailForm = false;
  showOTPForm = true;

  @Output() emailVerifiedEvent = new EventEmitter();

  constructor(private formBuilder: FormBuilder,
    private serverAuthService: ServerAuthService,
    private authService: AuthService,
    private storedUserService: StoredUserService,
    private storageService: StorageService,
    private router: Router,
    private notificationService: NotificationService) { }

  ngOnInit() {
    // this.mailForm = this.formBuilder.group({
    //   userPrimaryEmail: ["", Validators.compose([Validators.required, Validators.email])],
    // });
    this.storedUserService.getUser().then((user) => {
      this.user = user;
      this.email = user.userUsername;
      // this.mailForm.patchValue({
      //   userPrimaryEmail: this.user.userUsername
      // })
      console.log(this.user);
      if (this.user.userIsUsernameVerified == "false") {
        this.sentVerification();
      }
    });
    this.otpForm = this.formBuilder.group({
      verificationCode: ['', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(4)])],
    });
  }

  toggleShow() {
    this.showEmailForm = !this.showEmailForm;
    this.showOTPForm = !this.showOTPForm;
  }

  sentVerification(shouldToggle = false) {
    // this.email = this.mailForm.get("userPrimaryEmail").value;
    let verificationData = {
      "userUsername": this.email
    }
    this.serverAuthService.sentUsernameVerificationOtp(verificationData).subscribe((sentOtpResponse: Httpresponse) => {
      if (sentOtpResponse.status) {
        this.notificationService.showNotification("OTP sent successfully.")
        if (shouldToggle) {
          this.toggleShow();
        }
      } else {
        this.notificationService.showNotification("Failed to sent OTP.")
      }
    })
  }

  changeEmail() {
    this.email = "";
    this.toggleShow();
  }

  resendOtp() {
    this.sentVerification(false);
  }

  verifyOtp() {
    let verificationCodeData = {
      "userUsername": this.email,
      "verificationCode": this.otpForm.get("verificationCode").value
    }
    this.serverAuthService.verifyUsernameOtp(verificationCodeData).subscribe((verifyOtpResponse: Httpresponse) => {
      if (verifyOtpResponse.status) {
        this.notificationService.showNotification("OTP verified successfully.Please sign in again to continue.")
        this.storageService.setData("user_just_verified", this.email).then((data) => {
          if(data){
            this.completeOTPVerification();
          }
        })
      } else {
        this.notificationService.showNotification("Invalid OTP or user.")
      }
    })
  }

  completeOTPVerification() {
    this.authService.signOut();
  }

}
