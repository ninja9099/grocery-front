import { Injectable } from '@angular/core';
import {UserModel} from './user.modal';
import {config} from 'rxjs';
import {ApiService} from "../../../core/services/api.service";
import {Path} from "../../../core/structs";



@Injectable()
export class SignupService {
    constructor(public apiService: ApiService) {
    }
    register(request: UserModel) {
        const formRequest = new FormData();
        formRequest.append('first_name', request.first_name);
        formRequest.append('last_name', request.last_name);
        formRequest.append('email', request.email);
        formRequest.append('password', request.password);
        return this.apiService.post(Path.user, formRequest);
    }
}
