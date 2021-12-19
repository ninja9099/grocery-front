import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Path} from '../structs';
import {BehaviorSubject, throwError} from 'rxjs';
import {ApiService} from './api.service';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  public submitted = new BehaviorSubject(false);

  constructor(
    private http: HttpClient,
    private apiService: ApiService
  ) {
  }
  /**
   * Handles error occurred by http calls
   * @param error dfd
   */
  handleError(error: HttpErrorResponse) {
    console.log('In error');
    if (error.status === 403) {
      return throwError(
        error.error);
    }
    if (error.status === 401) {
      localStorage.removeItem('token');
      // window.location.href = '/login';
      // this._toast.info ('Please login again!', 'Your session has been expired');
      return throwError(
        error.error);
    }
    if (error.error instanceof ErrorEvent) {

      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,

      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      error.error);
  }
}
