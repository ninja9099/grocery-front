import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse} from '@angular/common/http';
import {tap} from 'rxjs/operators';
import {LoaderService} from './loader.service';
import {Observable} from 'rxjs';


@Injectable()
export class LoaderInterceptorService implements HttpInterceptor {
  private totalRequests = 0;

  constructor(private loaderService: LoaderService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log(this.totalRequests);
    this.totalRequests++;
    this.showLoader();
    return next.handle(req).pipe(tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          this.onEnd();
        }
      },
      (err: any) => {
        this.onEnd();
      }));
  }

  private onEnd(): void {
    this.totalRequests--;
    if (this.totalRequests === 0) {
      this.hideLoader();
    }
  }

  private showLoader(): void {
    this.loaderService.show();
  }

  private hideLoader(): void {
    this.loaderService.hide();
  }
}
