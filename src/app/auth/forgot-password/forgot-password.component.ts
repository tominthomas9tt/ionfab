import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Httpresponse } from 'src/app/common/models/httpresponse.model';
import { ForgotUser, ResetUser } from 'src/app/common/models/resetpassword';
import { ServerAuthService } from 'src/app/common/services/http/serverauth.service';
import { NotificationService } from 'src/app/common/services/notification.service';
import { isEmpty } from 'src/app/common/utils/utils';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {

  forogotPasswordForm: FormGroup;
  resetPasswordForm: FormGroup;
  isLoggedin: boolean;
  resetCodeSent: boolean = false;
  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';

  user: ForgotUser = {
    userUsername: ""
  };

  constructor(private formBuilder: FormBuilder,
    private serverauth: ServerAuthService,
    private router: Router,
    private notificationService: NotificationService) { }

  ngOnInit() {
    this.forogotPasswordForm = this.formBuilder.group({
      userUsername: ['', Validators.compose([Validators.required, Validators.email])],
    });

    this.resetPasswordForm = this.formBuilder.group({
      verificationCode: ['', Validators.required],
      userPassword: ['', Validators.required]
    })
  }

  onSubmit() {
    this.sentVerification(true);
  }

  toggleView() {
    this.resetCodeSent = !this.resetCodeSent;
  }

  onResetSubmit() {
    let resetUserData: ResetUser = this.resetPasswordForm.value;
    if (!isEmpty(resetUserData)) {
      resetUserData.userUsername = this.user.userUsername;
      this.serverauth.resetPassword(resetUserData).subscribe((responseData: Httpresponse) => {
        if (responseData.status) {
          this.notificationService.showNotification("Password updated successfully.");
          this.router.navigateByUrl("/auth/login", { replaceUrl: true });
        } else {
          if (!isEmpty(responseData.error)) {
            this.notificationService.showNotification(responseData.error[0].errorMessage);
          } else {
            this.notificationService.showNotification("Something went wrong, please try later.");
          }
          console.log(responseData.error);
        }
      });
    }
  }

  hideShowPassword() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }

  sentVerification(shouldToggle = false) {
    this.user = this.forogotPasswordForm.value;
    if (!isEmpty(this.user.userUsername)) {
      this.serverauth.forgotPassword(this.user).subscribe((responseData: Httpresponse) => {
        if (responseData.status) {
          this.notificationService.showNotification("Password reset code sent successfully to your email.");
          if (shouldToggle) {
            this.toggleView();
          }
        } else {
          console.log(responseData.error);
          this.notificationService.showNotification();
        }
      });
    } else {
      this.notificationService.showNotification("Please enter valid credentials.");
    }
  }

  resendOtp() {
    this.sentVerification(false);
  }

}
