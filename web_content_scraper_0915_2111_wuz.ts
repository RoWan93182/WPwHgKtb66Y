// 代码生成时间: 2025-09-15 21:11:23
 * and maintainability.
 */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

/**
 * Represents the WebContentScraper service which fetches web content.
 */
@Injectable({
  providedIn: 'root',
})
export class WebContentScraperService {
  
  /**
   * Base URL for the web content scraper.
   */
  private baseUrl: string = 'https://example.com';

  /**
   * Constructor for the WebContentScraper service.
   * @param http The Angular HttpClient module for making HTTP requests.
   */
  constructor(private http: HttpClient) { }

  /**
   * Fetches the content of a specific URL.
   * @param url The URL of the page to scrape.
   * @returns An Observable that emits the scraped content or an error.
   */
  public scrapeContent(url: string): Observable<string> {
    return this.http.get<string>(this.baseUrl + url, { responseType: 'text' })  // Assuming text response
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Generic error handler to catch and handle errors.
   * @param error The error object caught during the HTTP request.
   * @returns An Observable that emits error information.
   */
  private handleError(error: any) {
    let errMsg: string;
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errMsg = `An error occurred: ${error.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      // so we log it for further investigation.
      errMsg = `Server returned code: ${error.status}, error message is: ${error.message}`;
    }
    console.error(errMsg);
    return throwError(errMsg);
  }
}
