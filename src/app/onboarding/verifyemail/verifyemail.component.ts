import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Httpresponse } from 'src/app/common/models/httpresponse.model';
import { UserService } from 'src/app/common/services/http/user.service';
import { NotificationService } from 'src/app/common/services/notification.service';
import { StoredUserService } from 'src/app/common/services/storeduser.service';
import { ValidatorPatterns } from 'src/app/common/validators/patterns';

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

  showEmailForm = true;
  showOTPForm = false;

  @Output() emailVerifiedEvent = new EventEmitter();

  constructor(private formBuilder: FormBuilder,
    private userService: UserService,
    private storedUserService: StoredUserService,
    private notificationService: NotificationService) { }

  ngOnInit() {
    this.mailForm = this.formBuilder.group({
      userPrimaryEmail: ["", Validators.compose([Validators.required, Validators.email])],
    });
    this.storedUserService.getUser().then((user) => {
      this.user = user;
      this.mailForm.patchValue({
        userPrimaryEmail: this.user.userUsername
      })
    });
    this.otpForm = this.formBuilder.group({
      verificationCode: ['', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(4)])],
    });
  }

  toggleShow() {
    this.showEmailForm = !this.showEmailForm;
    this.showOTPForm = !this.showOTPForm;
  }

  sentVerification(shouldToggle=true) {
    this.email = this.mailForm.get("userPrimaryEmail").value;
    let verificationData = {
      "userId": this.user.userId,
      "userPrimaryEmail": this.email
    }
    this.userService.sentEmailVerificationOtp(verificationData).subscribe((sentOtpResponse: Httpresponse) => {
      if (sentOtpResponse.status) {
        this.notificationService.showNotification("OTP sent successfully.")
        if(shouldToggle){
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
      "userId": this.user.userId,
      "verificationCode": this.otpForm.get("verificationCode").value
    }
    this.userService.verifyEmailOtp(verificationCodeData).subscribe((verifyOtpResponse: Httpresponse) => {
      if (verifyOtpResponse.status) {
        this.notificationService.showNotification("OTP verified successfully.")
        this.completeOTPVerification();
      } else {
        this.notificationService.showNotification("Invalid OTP or user.")
      }
    })
  }

  completeOTPVerification() {
    this.emailVerifiedEvent.emit([]);
  }

}
