// 代码生成时间: 2025-09-04 10:05:13
import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpRequest, HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ErrorLoggerService {
  
  constructor(private http: HttpClient) {}

  /**
   * Log an error to a remote server.
   * @param error The error object to be logged.
   */
  logError(error: any): Observable<any> {
    const req = new HttpRequest(
      'POST',
      'https://your-error-logging-server.com/log',
      error,
      {
        reportProgress: true,
        responseType: 'text'
      }
    );
    return this.http.request(req).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  /**
   * Handle HTTP error.
   * @param error The HTTP error to handle.
   */
  private handleError(error: HttpEvent<any>) {
    if (error.error instanceof ErrorEvent) {
      // Client-side or network error occurred
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`
      );
    }
    // Return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.'
    );
  }
}
