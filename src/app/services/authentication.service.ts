import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { BehaviorSubject } from 'rxjs';
import { environment , SERVER_URL } from '../../environments/environment';

import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

const TOKEN_KEY = 'shop-api-auth-token';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  authenticationState = new BehaviorSubject(false);
  loginUrl            = SERVER_URL + '/login';

  constructor(private storage: Storage, private plt: Platform, private http: HttpClient) { 

    this.plt.ready().then(() => { this.checkToken(); });

  }

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  checkToken() {

    this.storage.get(TOKEN_KEY).then(res => {
      res ? this.authenticationState.next(true) : false;
    })
  }
  
  authenticate( credentials ): Observable<any> {
    
    return this.http
      .post<any>(this.loginUrl, credentials, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )

  }

  login( access_token ) {

    const at = 'Bearer ' + access_token;
    
    return this.storage.set(TOKEN_KEY, at).then(() => {
      this.authenticationState.next(true);
    });
  
  }
 
  logout() {
    return this.storage.remove(TOKEN_KEY).then(() => {
      this.authenticationState.next(false);
    });
  }
 
  isAuthenticated() {
    return this.authenticationState.value;
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

}
