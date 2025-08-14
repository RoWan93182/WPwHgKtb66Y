// 代码生成时间: 2025-08-15 02:39:37
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpRequestHandler {

  private baseUrl: string = 'https://api.example.com';

  constructor(private http: HttpClient) {}

  /**
   * Makes a GET request to the specified endpoint.
   * @param endpoint The endpoint URL.
   * @returns An Observable of the response data.
   */
  get<T>(endpoint: string): Observable<T> {
    return this.http.get<T>(this.baseUrl + endpoint)
      .pipe(
        retry(3), // Retry up to 3 times on failure
        catchError(this.handleError) // Handle any errors that occur during the request
      );
  }

  /**
   * Makes a POST request to the specified endpoint with a body.
   * @param endpoint The endpoint URL.
   * @param body The data to send in the body of the request.
   * @returns An Observable of the response data.
   */
  post<T>(endpoint: string, body: any): Observable<T> {
    return this.http.post<T>(this.baseUrl + endpoint, body, { headers: this.getDefaultHeaders() })
      .pipe(
        catchError(this.handleError) // Handle any errors that occur during the request
      );
  }

  /**
   * Makes a PUT request to the specified endpoint with a body.
   * @param endpoint The endpoint URL.
   * @param body The data to send in the body of the request.
   * @returns An Observable of the response data.
   */
  put<T>(endpoint: string, body: any): Observable<T> {
    return this.http.put<T>(this.baseUrl + endpoint, body, { headers: this.getDefaultHeaders() })
      .pipe(
        catchError(this.handleError) // Handle any errors that occur during the request
      );
  }

  /**
   * Makes a DELETE request to the specified endpoint.
   * @param endpoint The endpoint URL.
   * @returns An Observable of the response data.
   */
  delete<T>(endpoint: string): Observable<T> {
    return this.http.delete<T>(this.baseUrl + endpoint)
      .pipe(
        catchError(this.handleError) // Handle any errors that occur during the request
      );
  }

  /**
   * Returns the default headers for HTTP requests.
   * @returns HttpHeaders object with default headers.
   */
  private getDefaultHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + 'your_token_here' // Replace with actual token retrieval logic
    });
  }

  /**
   * Handles HTTP errors by throwing a user-friendly error message.
   * @param error The HttpErrorResponse received from the server.
   * @returns An Observable that throws the error.
   */
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
      return throwError('An error occurred: ' + error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`
      );
      return throwError(
        `Something bad happened; please try again later.`
      );
    }
  }
}
