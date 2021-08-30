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
import { VerifyemailComponent } from './verifyemail/verifyemail.component';
import { TermsandconditionsComponent } from './termsandconditions/termsandconditions.component';
import { SharedComponentsModule } from '../common/components/components.module';

const COMPONENTS = [
  AuthPage,
  LoginComponent,
  SignupComponent,
  ForgotPasswordComponent,
  ResetPasswordComponent,
  TermsandconditionsComponent,
  VerifyemailComponent,
  Error404Component,
]

@NgModule({
  imports: [
    CommonModule,
    SharedComponentsModule,
    AuthPageRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  declarations: [...COMPONENTS]
})
export class AuthPageModule { }
