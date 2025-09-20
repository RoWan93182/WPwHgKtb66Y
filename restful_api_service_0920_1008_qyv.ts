// 代码生成时间: 2025-09-20 10:08:23
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RestfulApiService {

  private apiURL: string = 'https://api.example.com';

  constructor(private http: HttpClient) {
  }

  /**
   * Fetches data from the RESTful API.
   * @param endpoint API endpoint to fetch data from.
   * @returns Observable data or error.
   */
  public fetchData(endpoint: string): Observable<any> {
    return this.http.get<any>(`${this.apiURL}/${endpoint}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Handles HTTP errors.
   * @param error HttpErrorResponse error object.
   * @returns Observable error message.
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
