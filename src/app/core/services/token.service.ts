import { Injectable } from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpRequest, HttpResponse} from '@angular/common/http';
import { Observable } from 'rxjs';
import {Router} from '@angular/router';
import {tap} from 'rxjs/operators';
import {GlobalErrorHandlerService} from './global-error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private router: Router, private GEHS: GlobalErrorHandlerService) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');
    debugger;
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `JWT ${token}`
        }
      });
    }
    return next.handle(request).pipe(tap(() => {},
      (err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 402) {
          this.GEHS.handleError(err);
        }
        if (err.status !== 401) {
         return;
        }
        this.router.navigate(['auth', 'user', 'login']);
      }
    }));
  }
}
