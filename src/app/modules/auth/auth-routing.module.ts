import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {SignupComponent} from './signup/signup.component';
import {PasswordResetComponent} from './password-reset/password-reset.component';


const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'login'
    }
  },
  {
    path: 'signup',
    component: SignupComponent,
    data: {
      title: 'signup'
    }
  },
  {
    path: 'password-reset',
    component: PasswordResetComponent,
    data: {
      title: 'password-reset',
    }
  },
  {
    path: 'password-reset/:token/:id',
    component: PasswordResetComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
