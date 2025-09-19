// 代码生成时间: 2025-09-20 02:05:51
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

/**
 * ApiService class handles RESTful API calls.
 * It provides a generic way to handle HTTP requests and responses.
 */
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl: string = 'https://api.example.com'; // Base URL of the RESTful API

  constructor(private http: HttpClient) {}

  /**
   * GET request for fetching data.
   * @param endpoint The specific endpoint to call.
   * @returns An Observable of the response.
   */
  getData<T>(endpoint: string): Observable<T> {
    return this.http.get<T>(this.baseUrl + endpoint).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * POST request for creating new data.
   * @param endpoint The specific endpoint to call.
   * @param data The data to send in the POST request.
   * @returns An Observable of the response.
   */
  postData<T>(endpoint: string, data: any): Observable<T> {
    return this.http.post<T>(this.baseUrl + endpoint, data).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Error handling for HTTP requests.
   * @param error The error received from the HTTP request.
   * @returns An Observable that throws the error.
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
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.'
    );
  }
}
