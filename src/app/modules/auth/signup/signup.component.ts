import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {UserModel} from './user.modal';
import {SignupService} from './signup.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  constructor(
      private fb: FormBuilder,
      private router: Router,
      private signupService: SignupService,
      private toast: ToastrService
  ) {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(
          // tslint:disable-next-line:max-line-length
          '^(([^<>()\\[\\]\\\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$'
      )]],
      password: ['', [Validators.required, Validators.pattern('(?=.*[0-9])(?=.*[$@$!%*?^&])[A-Za-z\d$@$!%*?^&].{7,}')]],
      confirmPassword: ['', Validators.required]
    }, {validator: SignupComponent.matchConfirmPassword});
  }

  get f() {
    return this.registerForm.controls;
  }
registerForm: FormGroup;
  submitted = false;
  errorMsg = '';
  success = false;

  static matchConfirmPassword(group: FormGroup) {
    const password = group.controls.password.value;
    const confirmPassword = group.controls.confirmPassword.value;
    if (password !== confirmPassword) {
      return { invalid: true };
    }
    return null;
  }

  ngOnInit(): void {
  }

  register() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    const userData: UserModel = {
      first_name: this.registerForm.value.firstName,
      last_name: this.registerForm.value.lastName,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password
    };
    this.signupService.register(userData).subscribe((response) => {
      // tslint:disable-next-line:no-debugger
      this.toast.success('User has been created successfully');
      this.success = true;
    }, error => {
      this.toast.error(JSON.stringify(error.error));
    });
  }
}
