// 代码生成时间: 2025-08-21 19:44:17
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BackupRestoreService {

  private backupUrl = '/api/backup';
  private restoreUrl = '/api/restore';

  constructor(private http: HttpClient) {
  }

  /**
   * Backup data to a specified location.
   * @param data Data to be backed up.
   * @returns An Observable with the backup result.
   */
  public backupData(data: any): Observable<any> {
    return this.http.post(this.backupUrl, data).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  /**
   * Restore data from a specified location.
   * @param data Data to be restored.
   * @returns An Observable with the restore result.
   */
  public restoreData(data: any): Observable<any> {
    return this.http.post(this.restoreUrl, data).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  /*
   * Handle HTTP errors.
   */
  private handleError(error: any) {
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
