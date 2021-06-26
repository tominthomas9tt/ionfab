import { Component, OnInit } from '@angular/core';


import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/common/models/user';
import { AuthService } from 'src/app/common/services/auth.service';


import '@codetrix-studio/capacitor-google-auth';

import { Plugins } from '@capacitor/core';
import { NotificationService } from 'src/app/common/services/notification.service';
import { StorageService } from 'src/app/common/services/storage.service';
import { isEmpty } from 'src/app/common/utils/utils';
import { LoginUserCredential } from 'src/app/common/models/loginusercredential';
import { ServerAuthService } from 'src/app/common/services/http/serverauth.service';
import { Httpresponse } from 'src/app/common/models/httpresponse.model';
import { BusinessService } from 'src/app/common/services/http/business.service';

const TOKEN_KEY = "user-tokens";
const USER_KEY = "user-data";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  isLoggedin: boolean;

  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';

  user: LoginUserCredential = {
    userUsername: "",
    userPassword: ""
  };

  constructor(private formBuilder: FormBuilder,
    private storage: StorageService,
    private serverAuth: ServerAuthService,
    private authService: AuthService,
    private businessService: BusinessService,
    private router: Router,
    private notificationService: NotificationService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      userUsername: ['', Validators.compose([Validators.required, Validators.email])],
      userPassword: ['', Validators.required]
    });
    this.storage.getData("user_just_verified").then((data) => {
      if (data) {
        this.loginForm.patchValue({ userUsername: data });
        this.storage.setData("user_just_verified", null);
      }
    })
  }

  async googleSignUp() {
    const googleUser = await Plugins.GoogleAuth.signIn();
    console.log(googleUser);
  }

  hideShowPassword() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }

  async onSubmit() {
    this.user = this.loginForm.value;
    if (!isEmpty(this.user.userUsername) && !isEmpty(this.user.userPassword)) {
      this.serverAuth.getUsers(this.user).subscribe((data: Httpresponse) => {
        if (data.status) {
          let user = data.data[0].user;
          let tokens = { authToken: data.data[0].token, refreshToken: data.data[0].refreshToken };
          this.storage.setData(USER_KEY, user);
          this.storage.setData(TOKEN_KEY, tokens).then((status) => {
            if (status) {
              if (user.userIsUsernameVerified == "false") {
                this.router.navigateByUrl("/auth/verify-user", { replaceUrl: true });
              } else {
                this.businessService.getBusinessStatus().subscribe((data: Httpresponse) => {
                  if (data.status) {
                    let businessData = data.data[0];
                    if (businessData.verifiedBy != 0) {
                      this.router.navigateByUrl("/dashboard/home", { replaceUrl: true });
                    } else {
                      this.storage.setData("busData", businessData).then((stStatus) => {
                        if (stStatus) {
                          if (businessData.businessSubscriptionDate != null) {
                            this.router.navigateByUrl("/onboarding/verification-status", { replaceUrl: true });
                          } else {
                            this.router.navigateByUrl("/onboarding/start", { replaceUrl: true });
                          }
                        }
                      })

                    }
                  } else {

                  }
                });
              }
            }
          })
        } else {
          const errors = data.error;
          let errorMessage = "Something went wrong.";
          if (errors && errors.length > 0) {
            errorMessage = "";
            errors.forEach(error => {
              errorMessage += error.errorMessage;
            });
          }
          this.notificationService.showNotification(errorMessage);
        }
      });

      // const dats = this.authService.signIn(this.user)
      // .subscribe(user => {
      //   console.log(user);
      //   this.router.navigateByUrl("/dashboard/home");
      // })
    } else {
      this.notificationService.showNotification("Please enter valid credentials.");
    }
  }

}
