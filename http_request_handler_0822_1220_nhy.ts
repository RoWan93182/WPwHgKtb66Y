// 代码生成时间: 2025-08-22 12:20:22
 * It includes error handling and is designed to be maintainable and extensible.
 */
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpRequestHandler {
  // The base URL for the API
  private baseUrl: string = 'https://api.example.com';

  // Injecting the HttpClient in the constructor
  constructor(private http: HttpClient) {}

  // Generic method to handle GET requests
  public get<T>(endpoint: string): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}/${endpoint}`).pipe(
      retry(3), // Retry the request up to 3 times
      catchError(this.handleError) // Handle errors
    );
  }

  // Generic method to handle POST requests
  public post<T>(endpoint: string, body: any): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}/${endpoint}`, body).pipe(
      catchError(this.handleError) // Handle errors
    );
  }

  // Generic method to handle PUT requests
  public put<T>(endpoint: string, body: any): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}/${endpoint}`, body).pipe(
      catchError(this.handleError) // Handle errors
    );
  }

  // Generic method to handle DELETE requests
  public delete<T>(endpoint: string): Observable<T> {
    return this.http.delete<T>(`${this.baseUrl}/${endpoint}`).pipe(
      catchError(this.handleError) // Handle errors
    );
  }

  // Private method to handle errors
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
