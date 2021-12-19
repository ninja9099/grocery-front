import { ErrorHandler, Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject, throwError} from 'rxjs';

export interface IpaymentRequired {
  status: number;
  statustext: string;
  ok: boolean;
}

@Injectable({
    providedIn: 'root'
})
export class GlobalErrorHandlerService implements ErrorHandler {

  public paymentRequiredSubject = new Subject<IpaymentRequired>();
  public paymentRequiredObservable = this.paymentRequiredSubject.asObservable();
  constructor(
    private router: Router,
    private toast: ToastrService
    ) {
    }

  handleError(error: Error | HttpErrorResponse) {
    if (error instanceof HttpErrorResponse) {
      if (error.status === 402) {
        this.paymentRequiredSubject.next({
          status: error.status, statustext: error.statusText, ok: false});
      }
      if (error.status === 401) {
         localStorage.clear();
         this.router.navigate(['auth', 'user', 'login']);
      }
    }
    return throwError(error);
  }
}
