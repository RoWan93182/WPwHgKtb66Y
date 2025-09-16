// 代码生成时间: 2025-09-16 09:49:00
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl: string = 'https://api.example.com';
  private authUrl: string = '/auth';
  private headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(private http: HttpClient) {}

  /**
   * Logs a user in using their credentials.
   * @param username The username of the user.
   * @param password The password of the user.
   * @returns An observable that emits the authentication result.
   */
  login(username: string, password: string): Observable<any> {
    const authData = {
      username: username,
      password: password
    };

    return this.http.post<any>(
      `${this.apiUrl}${this.authUrl}`,
      authData,
      { headers: this.headers }
    ).pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(this.handleError)
    );
  }

  /**
   * Logs a user out.
   * @returns An observable that emits the logout result.
   */
  logout(): Observable<any> {
    const authData = {
      token: localStorage.getItem('token')
    };

    return this.http.post<any>(
      `${this.apiUrl}${this.authUrl}/logout`,
      authData,
      { headers: this.headers }
    ).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Handles any errors that occur during HTTP requests.
   * @param error The error caught from the observable.
   * @returns An observable that emits the error message.
   */
  private handleError(error: any) {
    let errorMessage = 'An unknown error occurred';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Server returned code: ${error.status}, error message is: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }

  /**
   * Sets the authentication token.
   * @param token The token to be stored.
   */
  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  /**
   * Gets the authentication token.
   * @returns The stored token.
   */
  getToken(): string {
    return localStorage.getItem('token');
  }

  /**
   * Checks if the user is authenticated.
   * @returns A boolean indicating the authentication status.
   */
  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
