import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

import { Brand } from '../models/brand';
import { environment , SERVER_URL } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class BrandService {

  constructor(private http: HttpClient) { }

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  // Handle API errors
  handleError(error: HttpErrorResponse) {
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
      'Something bad happened; please try again later.');
  };


  // Create a new item
  createBrand(brand): Observable<any> {

    const form = { name : brand };
    const api = SERVER_URL +'/brand';
    return this.http
      .post<any>( api , form, this.httpOptions )
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // Brand list
  getBrand(page = 1): Observable<any> {
    const api = SERVER_URL +'/brand';
    return this.http
      .get<any>( api , this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

}
