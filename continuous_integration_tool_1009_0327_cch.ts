// 代码生成时间: 2025-10-09 03:27:22
 * Continuous Integration Tool implementation using Angular and TypeScript.
 * This tool will handle basic CI operations such as building and testing projects.
 */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

// Define a service to handle continuous integration tasks
@Injectable({
  providedIn: 'root'
})
export class ContinuousIntegrationService {

  constructor(private http: HttpClient) {}

  // Function to build the project
  buildProject(projectName: string): Observable<any> {
    const url = `/api/build/${projectName}`;
    return this.http.post(url, {}).pipe(
      catchError(this.handleError)
    );
  }

  // Function to test the project
  testProject(projectName: string): Observable<any> {
    const url = `/api/test/${projectName}`;
    return this.http.post(url, {}).pipe(
      catchError(this.handleError)
    );
  }

  // Private method to handle HTTP errors
  private handleError(error: any) {
    let errMsg: string;
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errMsg = `An error occurred: ${error.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      errMsg = `Server returned code ${error.status}, error message is: ${error.message}`;
    }
    console.error(errMsg);
    return throwError(errMsg);
  }
}

/*
 * Example usage of the ContinuousIntegrationService.
 * This should be in a component where you want to trigger CI operations.
 */

import { Component } from '@angular/core';
import { ContinuousIntegrationService } from './continuous_integration_service';

@Component({
  selector: 'app-continuous-integration',
  template: `<button (click)="buildAndTestProject('exampleProject')">Build and Test Project</button>`,
  styleUrls: ['./continuous_integration.component.css']
})
export class ContinuousIntegrationComponent {

  constructor(private ciService: ContinuousIntegrationService) {}

  buildAndTestProject(projectName: string): void {
    this.ciService.buildProject(projectName).subscribe(
      response => console.log('Build Successful:', response),
      error => console.error('Build Failed:', error)
    );

    this.ciService.testProject(projectName).subscribe(
      response => console.log('Tests Successful:', response),
      error => console.error('Tests Failed:', error)
    );
  }
}
