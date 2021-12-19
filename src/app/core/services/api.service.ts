import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {catchError, retry, shareReplay} from 'rxjs/operators';
import {GlobalErrorHandlerService} from './global-error-handler.service';

@Injectable()
export class ApiService {
  constructor(private http: HttpClient, private error: GlobalErrorHandlerService) {
  }

  public download(url: string): Observable<Blob> {
    return this.http.get(url, {
      responseType: 'blob'
    });
  }

  public get(
    path: string,
    queryParams: any,
    baseUrl: string = environment.baseUrl
  ): Observable<any> {
    let httpParams: HttpParams;
    let httpHeaders: HttpHeaders = new HttpHeaders();
    Object.keys(queryParams).forEach(key => {
      if (key === 'headers') {
        Object.keys(queryParams.headers).forEach(hkey => {
          if (queryParams.headers[hkey] !== null && queryParams.headers[hkey] !== '') {
            // tslint:disable-next-line: quotemark
            httpHeaders = httpHeaders.set(hkey, queryParams.headers[hkey]);
          }
        });
      } else {
        httpParams = this.getQueryParams(queryParams);
      }
    })
    // @ts-ignore
    return this.http
      .get(`${baseUrl + path}`, {
        headers: httpHeaders,
        observe: 'response',
         // @ts-ignore
        params: httpParams
      })
      .pipe(
        retry(1),
        shareReplay(),
        catchError(this.error.handleError.bind(this))
      );
  }

  public getSingle(
    path: string,
    httpHeaders: any = {},
    baseUrl: string = environment.baseUrl
  ): Observable<any> {
    return this.http.get(`${baseUrl + path}`, {headers: httpHeaders, observe: 'response'}).pipe(
      retry(1),
      shareReplay(),
      catchError(this.error.handleError.bind(this))
    );
  }

  public post(
    path: string,
    requestObject: any,
    httpHeaders: any = {},
    baseUrl: string = environment.baseUrl
  ): Observable<any> {
    return this.http
      .post(`${baseUrl + path}`, requestObject, {
        headers: httpHeaders,
        observe: 'response'
      })
      .pipe(
        shareReplay(),
        catchError(this.error.handleError.bind(this))
      );
  }

  public postFormEncoded(
    path: string,
    requestObject: any,
    httpHeaders: any = {},
    baseUrl: string = environment.baseUrl
  ): Observable<any> {
    const body = new URLSearchParams();
    if (requestObject) {
      Object.keys(requestObject).forEach(obj => {
        if (requestObject[obj] !== null || requestObject[obj] !== undefined) {
          body.set(obj, requestObject[obj]);
        }
      });
    }
    return this.http
      .post(`${baseUrl + path}`, body.toString(), {
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        observe: 'response'
      })
      .pipe(
        retry(1),
        shareReplay(),
        catchError(this.error.handleError.bind(this))
      );
  }

  public uploadFile(
    path: string,
    requestObject: any,
    baseUrl: string = environment.baseUrl
  ): Observable<any> {
    return this.http
      .post(`${baseUrl + path}`, requestObject, {
        reportProgress: true,
        observe: 'events'
      })
      .pipe(
        retry(1),
        shareReplay(),
        catchError(this.error.handleError.bind(this))
      );
  }

  public put(
    path: string,
    requestObject: any,
    httpHeaders: any = {},
    baseUrl: string = environment.baseUrl
  ): Observable<any> {
    return this.http
      .put(`${baseUrl + path}`, requestObject, {
        headers: httpHeaders,
        observe: 'response'
      })
      .pipe(
        retry(1),
        shareReplay(),
        catchError(this.error.handleError.bind(this))
      );
  }

  public delete(
    path: string,
    httpHeaders: any = {},
    baseUrl: string = environment.baseUrl
  ): Observable<any> {
    return this.http.delete(`${baseUrl + path}`, {headers: httpHeaders, observe: 'response'}).pipe(
      shareReplay(),
      catchError(this.error.handleError.bind(this))
    );
  }

  private getQueryParams(queryParams: any) {
    let queryString: HttpParams = new HttpParams();
    Object.keys(queryParams).forEach(param => {
      if (param !== 'headers') {
        if (queryParams[param] !== null && queryParams[param] !== '') {
          const value = queryParams[param].toString().trim();
          queryString = queryString.append(param, value);
        }
      }
    });
    return queryString;
  }
}
