import {Component, OnInit} from '@angular/core';
import {PasswordResetService} from './password-reset.service';
import {ToastrService} from 'ngx-toastr';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent implements OnInit {

  public userId: number;
  public email: string;
  public password: string;
  public code: string;
  public confirmPass: string;
  public isPassReset = false;
  public isEmailError = false;
  public setPasswordError = false;
  public emailErrorMsg: string;
  public isvalidated = false;
  public passwordErrorStr = '';

  constructor(
    private passwordService: PasswordResetService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toast: ToastrService) {
  }

  ngOnInit(): void {
    this.userId = parseInt(this.activatedRoute.snapshot.params.id, 10);
    this.code = this.activatedRoute.snapshot.params.token;
  }

  onChange(event) {
    this.emailErrorMsg = '';
    this.isEmailError = false;
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.isvalidated = re.test(String(event).toLowerCase());
    this.email = event;
  }

  resetPassword() {
    this.passwordService.resetPassword(this.email).subscribe((res) => {
      this.isPassReset = true;
    }, (error) => {
      this.isEmailError = true;
      this.emailErrorMsg = error.error.message;
    });
  }

  onPasswordChange(value, type) {
    if (type === 'pass') {
      this.password = value;
    }
    if (type === 'confpass') {
      this.confirmPass = value;
    }
    this.setPasswordError = false;
    this.passwordErrorStr = '';
    if (this.password && this.confirmPass) {
      if (this.password !== this.confirmPass) {
        this.setPasswordError = true;
        this.passwordErrorStr = 'Passwords and Confirm Password do not match';
      } else {
        this.setPasswordError = false;
        this.passwordErrorStr = '';
      }
    } else {
      this.setPasswordError = true;
      this.passwordErrorStr = 'Passwords and Confirm Password required';
    }

  }


  setPassword() {

    this.passwordService.setPassword(this.code, this.password).subscribe(res => {
      this.toast.success('Password change success');
      this.router.navigate(['/auth', 'user', 'login']);
    }, error => {
      this.setPasswordError = true;
      this.passwordErrorStr = error.error.message;
    });
  }
}
