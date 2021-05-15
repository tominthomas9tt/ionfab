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

  user: LoginUserCredential = {
    userUsername: "",
    userPassword: ""
  };

  constructor(private formBuilder: FormBuilder,
    private storage: StorageService,
    private serverAuth: ServerAuthService,
    private authService: AuthService,
    private router: Router,
    private notificationService: NotificationService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  async googleSignUp() {
    const googleUser = await Plugins.GoogleAuth.signIn();
    console.log(googleUser);
  }

  async onSubmit() {
    if (!isEmpty(this.user.userUsername) && !isEmpty(this.user.userPassword)) {

      this.serverAuth.getUsers(this.user).subscribe((data: Httpresponse) => {
        if (data.status) {
          let user = data.data[0].user;
          let tokens = { authToken: data.data[0].token, refreshToken: data.data[0].refreshToken };
          this.storage.setData(TOKEN_KEY, tokens);
          this.storage.setData(USER_KEY, user);
          this.router.navigateByUrl("/dashboard/home");
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
