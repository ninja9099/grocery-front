import { Injectable } from '@angular/core';
import { LoginRequest } from './login.model';
import {ApiService} from "../../../core/services/api.service";
import {Path} from "../../../core/structs";


@Injectable()
export class LoginService {
    constructor(public apiService: ApiService) {
    }

    login(request: LoginRequest) {
        return this.apiService.post(Path.login, request);
    }
}
