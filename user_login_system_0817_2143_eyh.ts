// 代码生成时间: 2025-08-17 21:43:51
 * It includes user authentication, error handling, and follows best practices for maintainability and scalability.
 */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../environments/environment'; // Import environment variables

// Interface for the user credentials
interface Credentials {
  username: string;
  password: string;
}

// Interface for the login response
interface LoginResponse {
  success: boolean;
  token?: string;
  message?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginUrl = `${environment.apiUrl}/login`; // URL to the login API

  constructor(private http: HttpClient) {}

  // Method to login a user
  login(credentials: Credentials): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.loginUrl, credentials).pipe(
      catchError(this.handleError)
    );
  }

  // Private method to handle HTTP errors
  private handleError(error: any): Observable<never> {
    // Log the error and return an Observable of the error
    console.error('An error occurred:', error);
    return Observable.throw(error.message || error);
  }
}

// Usage:
// import { AuthService } from './auth.service';
// const authService: AuthService = new AuthService(http);
// authService.login({ username: 'user', password: 'password' }).subscribe({
//   next: (response) => {
//     if (response.success) {
//       console.log('Logged in successfully!');
//       console.log('Token:', response.token);
//     } else {
//       console.error('Login failed:', response.message);
//     }
//   },
//   error: (error) => {
//     console.error('Error during login:', error);
//   }
// });