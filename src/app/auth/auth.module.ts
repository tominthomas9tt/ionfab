import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AuthPageRoutingModule } from './auth-routing.module';

import { AuthPage } from './auth.page';
import { LoginComponent } from './login/login.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { Error404Component } from '../common/components/error404/error404.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../common/http-interceptors/auth-interceptor';
import { SignupComponent } from './signup/signup.component';

const COMPONENTS = [
  AuthPage,
  LoginComponent,
  SignupComponent,
  ForgotPasswordComponent,
  ResetPasswordComponent,
  Error404Component,
]

@NgModule({
  imports: [
    CommonModule,
    AuthPageRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule
  ],
  providers: [
  ],
  declarations: [...COMPONENTS]
})
export class AuthPageModule { }
