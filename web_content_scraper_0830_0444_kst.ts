// 代码生成时间: 2025-08-30 04:44:33
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError as ObservableThrowError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebContentScraperService {

  constructor(private http: HttpClient) {}

  /**
   * Scrapes content from a given URL
   *
   * @param url The URL to scrape content from
   * @returns Observable<string> The scraped content as a string
   */
  getWebContent(url: string): any {
    return this.http.get(url, {
      responseType: 'text' as 'json'
    }).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Handles Http operation errors
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   * @returns Observable<any>
   */
  private handleError(error: any): any {
    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    let errorMessage = 'An error occurred';
    if (error.error instanceof ErrorEvent) {
      // Client-side or network error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      errorMessage = `Server returned code: ${error.status}, error message is: ${error.message}`;
    }

    // Return an observable with a user-facing error message
    return ObservableThrowError(errorMessage);
  }
}
