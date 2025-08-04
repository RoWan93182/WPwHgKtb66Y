// 代码生成时间: 2025-08-05 05:31:49
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpRequestHandlerService {

  // Inject HttpClient to make HTTP requests
  constructor(private http: HttpClient) { }

  /**
   * Makes a GET request to the specified URL and returns an Observable of the response.
   * @param url The URL to which the GET request is made.
   * @returns An Observable of the response.
   */
  get(url: string): Observable<any> {
    return this.http.get<any>(url).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Makes a POST request to the specified URL with the given body and returns an Observable of the response.
   * @param url The URL to which the POST request is made.
   * @param body The body of the POST request.
   * @returns An Observable of the response.
   */
  post(url: string, body: any): Observable<any> {
    return this.http.post<any>(url, body).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Makes a PUT request to the specified URL with the given body and returns an Observable of the response.
   * @param url The URL to which the PUT request is made.
   * @param body The body of the PUT request.
   * @returns An Observable of the response.
   */
  put(url: string, body: any): Observable<any> {
    return this.http.put<any>(url, body).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Makes a DELETE request to the specified URL and returns an Observable of the response.
   * @param url The URL to which the DELETE request is made.
   * @returns An Observable of the response.
   */
  delete(url: string): Observable<any> {
    return this.http.delete<any>(url).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Handles HTTP errors.
   * @param error The error to handle.
   * @returns An Observable that throws an error.
   */
  private handleError(error: any) {
    let errorMessage = 'An error occurred';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Client-side error: ${error.error.message}`;
    } else {
      errorMessage = `Server-side error: ${error.status ? `${error.status} - ${error.message}` : ''}`;
    }
    return throwError(errorMessage);
  }

}
