// 代码生成时间: 2025-09-21 19:13:03
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpRequestHandlerService {
  
  constructor(private http: HttpClient) {}

  /**
   * Sends a GET request to the specified URL and returns the response.
   * @param url The URL to which the GET request is sent.
   * @returns An Observable of the response data.
   */
  get(url: string): Observable<any> {
    return this.http.get(url).pipe(
      retry(3), // Retry a failed request up to 3 times
      catchError(this.handleError) // Handle any errors that occur during the request
    );
  }

  /**
   * Sends a POST request to the specified URL with a given body and returns the response.
   * @param url The URL to which the POST request is sent.
   * @param body The body of the POST request.
   * @returns An Observable of the response data.
   */
  post(url: string, body: any): Observable<any> {
    return this.http.post(url, body).pipe(
      retry(3), // Retry a failed request up to 3 times
      catchError(this.handleError) // Handle any errors that occur during the request
    );
  }

  /**
   * Sends a PUT request to the specified URL with a given body and returns the response.
   * @param url The URL to which the PUT request is sent.
   * @param body The body of the PUT request.
   * @returns An Observable of the response data.
   */
  put(url: string, body: any): Observable<any> {
    return this.http.put(url, body).pipe(
      retry(3), // Retry a failed request up to 3 times
      catchError(this.handleError) // Handle any errors that occur during the request
    );
  }

  /**
   * Sends a DELETE request to the specified URL and returns the response.
   * @param url The URL to which the DELETE request is sent.
   * @returns An Observable of the response data.
   */
  delete(url: string): Observable<any> {
    return this.http.delete(url).pipe(
      retry(3), // Retry a failed request up to 3 times
      catchError(this.handleError) // Handle any errors that occur during the request
    );
  }

  /**
   * Handle HTTP error.
   * @private
   */
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`
      );
    }
    // Return an Observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.'
    );
  }
}
