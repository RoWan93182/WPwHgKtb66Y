// 代码生成时间: 2025-10-01 21:41:57
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

// Interface representing the user permission data structure
export interface IUserPermission {
  id: string;
  userId: string;
  permission: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserPermissionsService {
  private apiEndpoint: string = 'https://api.example.com/permissions'; // Replace with actual API endpoint

  constructor(private http: HttpClient) {}

  // Method to fetch all user permissions
  public fetchUserPermissions(userId: string): Observable<IUserPermission[]> {
    return this.http.get<IUserPermission[]>(this.apiEndpoint + `/users/${userId}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Method to add a new user permission
  public addUserPermission(permission: IUserPermission): Observable<IUserPermission> {
    return this.http.post<IUserPermission>(this.apiEndpoint, permission)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Method to update an existing user permission
  public updateUserPermission(permission: IUserPermission): Observable<IUserPermission> {
    return this.http.put<IUserPermission>(this.apiEndpoint + `/${permission.id}`, permission)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Method to delete a user permission
  public deleteUserPermission(permissionId: string): Observable<any> {
    return this.http.delete(this.apiEndpoint + `/${permissionId}`)
      .pipe(
        catchError(this.handleError)
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
    // Return an Observable with a user-facing error message.
    return throwError('Something bad happened; please try again later.');
  }
}
