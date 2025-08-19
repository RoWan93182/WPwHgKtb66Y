// 代码生成时间: 2025-08-19 08:20:58
import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

/**
 * API Response Interceptor for formatting responses and handling errors.
 */
@Injectable()
export class ApiResponseFormatterInterceptor implements HttpInterceptor {

  /**
   * Intercepts HTTP requests and formats responses.
   * @param req HttpRequest
   * @param next HttpHandler
   * @returns Observable<HttpEvent<any>>
   */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          // Format the response data here if needed
          const { body, headers } = event;
          return new HttpResponse({
            body: this.formatResponse(body, headers),
            headers,
            status: event.status,
            statusText: event.statusText,
            url: event.url
          });
        }
        return event;
      },
      (err) => {
        // Handle errors here, e.g., by converting to user-friendly messages
        return throwError(() => this.handleError(err));
      }),
      catchError((err) => this.handleError(err))
    );
  }

  /**
   * Formats the response body based on the headers and data.
   * @param body Response body
   * @param headers Response headers
   * @returns any
   */
  private formatResponse(body: any, headers: HttpHeaders): any {
    // Implement response formatting logic here, e.g., JSON parsing,
    // error handling, data normalization, etc.
    if (headers.get('Content-Type')?.includes('application/json')) {
      return body; // Assuming JSON response, no further formatting needed
    }
    // Add more formatting rules as required for different content types
    return body;
  }

  /**
   * Handles errors by extracting user-friendly messages and
   * returning a custom error object.
   * @param error Error
   * @returns Error
   */
  private handleError(error: any): Error {
    let errorMessage = 'An unknown error occurred';
    if (error.error instanceof ErrorEvent) {
      // Client-side or network error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}, Message: ${error.message}`;
    }
    console.error(errorMessage);
    return new Error(errorMessage);
  }
}

/**
 * Class representing an HTTP response.
 * This is a simplified version of the actual HttpResponse class.
 */
export class HttpResponse extends HttpEvent<any> {
  constructor(private readonly _response: { status: number; statusText: string; url: string; headers: HttpHeaders; body: any }) {
    super();
  }

  get body(): any { return this._response.body; }
  get headers(): HttpHeaders { return this._response.headers; }
  get ok(): boolean { return this._response.status === 200; }
  get status(): number { return this._response.status; }
  get statusText(): string { return this._response.statusText; }
  get url(): string { return this._response.url; }
}

/**
 * Mock HttpHeaders for demonstration purposes.
 * In a real application, this would be imported from '@angular/common/http'.
 */
export class HttpHeaders {
  constructor(public headers: { [key: string]: string | string[] } = {}) {}

  get(key: string): string | null {
    return this.headers[key] ? this.headers[key] : null;
  }
}