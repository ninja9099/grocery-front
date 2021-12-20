import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AuthRoutingModule} from './auth-routing.module';
import {LoginComponent} from './login/login.component';
import {SignupComponent} from './signup/signup.component';
import {PasswordResetComponent} from './password-reset/password-reset.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SignupService} from './signup/signup.service';
import {LoginService} from './login/login.service';
import {PasswordResetService} from './password-reset/password-reset.service';
import {CoreModule} from "../../core/core.module";
import {RouterModule} from "@angular/router";


@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    PasswordResetComponent
  ],
  providers: [
    SignupService,
    LoginService,
    PasswordResetService
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AuthRoutingModule,
    CoreModule,
    RouterModule
  ]
})
export class AuthModule { }
