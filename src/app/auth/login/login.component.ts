import { Component, OnInit } from '@angular/core';


import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SocialAuthService, GoogleLoginProvider, SocialUser } from 'angularx-social-login';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth/auth.service';


import '@codetrix-studio/capacitor-google-auth';

import { Plugins } from '@capacitor/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  socialUser: SocialUser;
  isLoggedin: boolean;

  user: User = {
    email: "",
    password: ""
  };

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router) { }

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

  signIn() {
    this.authService.signIn(this.user).subscribe(user => {
      this.router.navigateByUrl("/dashboard/home");
    })
  }
}
