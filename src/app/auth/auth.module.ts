import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AuthPageRoutingModule } from './auth-routing.module';

import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';

import { AuthPage } from './auth.page';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { Error404Component } from '../common/components/error404/error404.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

const COMPONENTS = [
  AuthPage,
  LoginComponent,
  RegisterComponent,
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
    IonicModule,
    SocialLoginModule
  ],
  providers:[{
    provide: 'SocialAuthServiceConfig',
    useValue: {
      autoLogin: false,
      providers: [
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider(
            '113867069909-ue1ia8a97g022sk1r0mnof5k6e9mmaj6.apps.googleusercontent.com'
          )
        }
      ]
    } as SocialAuthServiceConfig,
  }  
],
  declarations: [...COMPONENTS]
})
export class AuthPageModule {}
