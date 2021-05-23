import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Httpresponse } from 'src/app/common/models/httpresponse.model';
import { ForgotUser } from 'src/app/common/models/resetpassword';
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
  isLoggedin: boolean;

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
  }

  onSubmit() {
    this.user = this.forogotPasswordForm.value;
    if (!isEmpty(this.user.userUsername)) {
      this.serverauth.forgotPassword(this.user).subscribe((responseData: Httpresponse) => {
        if (responseData.status) {
          this.notificationService.showNotification("User created. Please login to continue.");
          this.router.navigateByUrl("/auth/login");
        } else {
          console.log(responseData.error);
        }
      });
    } else {
      this.notificationService.showNotification("Please enter valid credentials.");
    }
  }

}
