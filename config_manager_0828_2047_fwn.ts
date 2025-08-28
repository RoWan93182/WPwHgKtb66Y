// 代码生成时间: 2025-08-28 20:47:31
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ConfigManager {
  private configUrl: string = '/api/config'; // Base URL for configuration APIs

  constructor(private http: HttpClient) {}

  /**
   * Load configuration from the server.
   * @returns Observable of configuration object.
   */
  loadConfig(): Observable<any> {
    return this.http.get(this.configUrl).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Save configuration to the server.
   * @param config Configuration object to save.
   * @returns Observable of the save operation.
   */
  saveConfig(config: any): Observable<any> {
    return this.http.post(this.configUrl, config).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Update configuration on the server.
   * @param config Configuration object with updates.
   * @returns Observable of the update operation.
   */
  updateConfig(config: any): Observable<any> {
    return this.http.put(this.configUrl, config).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Handle HTTP errors.
   * @param error HTTP error object.
   * @returns Observable of the error.
   */
  private handleError(error: any) {
    let errMsg: string;
    if (error.error instanceof ErrorEvent) {
      // Client-side or network error
      errMsg = `An error occurred: ${error.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      errMsg = `Server returned code: ${error.status}, error message is: ${error.message}`;
    }
    console.error(errMsg);
    return throwError(errMsg);
  }
}
