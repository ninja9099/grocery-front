import { Injectable } from '@angular/core';
import {ApiService} from "../../../core/services/api.service";
import {Path} from "../../../core/structs";



@Injectable({
  providedIn: 'root'
})
export class PasswordResetService {

  constructor(public apiService: ApiService) {

  }
  resetPassword(email: string) {
        const formRequest = new FormData();
        formRequest.append('email', email);
        return this.apiService.post(Path.account_reset_password, formRequest);
  }
  setPassword(token: string, password) {
        const formRequest = new FormData();
        formRequest.append('token', token);
        formRequest.append('password', password);
        formRequest.append('confirm_password', password);
        return this.apiService.post(Path.account_set_password, formRequest);
  }
}
