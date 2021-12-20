import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {LoginRequest} from './login.model';
import {LoginService} from './login.service';
import {AuthService} from "../../../core/services/auth.service";
import {UtilityService} from "../../../core/services/utility.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;
  public isloginError = false;
  public loginError: string;
  constructor(
      private fb: FormBuilder,
      private loginService: LoginService,
      private router: Router,
      private toast: ToastrService,
      private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.router.navigate(['']);
    }
    this.loginForm.valueChanges.subscribe(value => {
      this.isloginError = false;
    });
  }

  get f() {
    return this.loginForm.controls;
  }
  login() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    const loginRequest: LoginRequest = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password
    };
    this.loginService.login(loginRequest).subscribe((response) => {
        UtilityService.setLocalStorage('token', response.body.token);
        UtilityService.setLocalStorage('user', JSON.stringify(response.body.user));
        UtilityService.setLocalStorage('profile', JSON.stringify(response.body.profile));
        this.toast.success('Login Success !', 'Success');
        this.authService.isLoggedIn$.next(true);
        this.router.navigate(['/']);
    }, error => {
      this.loginError = error.error.non_field_errors[0];
      this.isloginError = true;
      this.toast.error(error.error.non_field_errors[0], 'Login Failure');
    });
  }
}
