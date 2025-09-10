// 代码生成时间: 2025-09-10 17:59:01
 * This tool provides a simple interface for executing database migration scripts.
 */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

/**
 * Interface for database migration script details.
 */
export interface MigrationScript {
  name: string;
  version: string;
  script: string;
}

@Injectable({
  providedIn: 'root'
})
export class DatabaseMigrationTool {
  private baseUrl: string = 'http://localhost:3000/migrations';

  constructor(private http: HttpClient) {}

  /**
   * Execute the migration script.
   * @param script The migration script to execute.
   */
  executeMigration(script: MigrationScript): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/execute`, script).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Get the list of available migration scripts.
   */
  getMigrationScripts(): Observable<MigrationScript[]> {
    return this.http.get<MigrationScript[]>(`${this.baseUrl}/list`).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Private method to handle HTTP errors.
   */
  private handleError(error: any) {
    // In a real-world scenario, you might want to implement a more sophisticated error handling mechanism.
    const errorMsg = `An error occurred: ${error.message}
${error.error.message}`;
    console.error(errorMsg);
    return throwError(errorMsg);
  }
}
