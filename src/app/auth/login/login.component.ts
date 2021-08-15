import { Component, OnInit } from '@angular/core';


import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import '@codetrix-studio/capacitor-google-auth';
import { Plugins } from '@capacitor/core';
import { isEmpty } from 'src/app/common/utils/utils';
import { LoginUserCredential } from 'src/app/common/models/loginusercredential';
import { ServerAuthService } from 'src/app/common/services/http/serverauth.service';
import { Httpresponse } from 'src/app/common/models/httpresponse.model';
import { Constants } from 'src/app/common/configs/index.config';
import { StorageService } from 'src/app/common/services/local/storage.service';
import { ErrorNotifier } from 'src/app/common/services/local/errornotifier';
import { NotificationService } from 'src/app/common/services/local/notification.service';

const TOKEN_KEY = "user-tokens";
const USER_KEY = "user-data";
const USER_ROLE_ID = Constants.USER_ROLE_ID;

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

  user: LoginUserCredential;

  constructor(private formBuilder: FormBuilder,
    private storage: StorageService,
    private serverAuth: ServerAuthService,
    private errorNotifier: ErrorNotifier,
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
      this.user.userRoleId = USER_ROLE_ID;
      this.serverAuth.getUsers(this.user).subscribe((data: Httpresponse) => {
        if (data.status) {
          // let userData = data?.data[0];
          // if (userData[0] && userData[0]?.userIsUsernameVerified) {
          let user = data.data[0].user;
          let tokens = { authToken: data.data[0].token, refreshToken: data.data[0].refreshToken };
          this.storage.setData(USER_KEY, user);
          this.storage.setData(TOKEN_KEY, tokens).then((status) => {
            if (status) {
              this.router.navigateByUrl("/dashboard/home", { replaceUrl: true });
            }
          })
          // } else {
          //   this.router.navigateByUrl("/auth/verify-user", { replaceUrl: true });
          // }
        } else {
          this.errorNotifier.showHttpErrors(data.error);
        }
      });
    } else {
      this.notificationService.showNotification("Please enter valid credentials.");
    }
  }

}
