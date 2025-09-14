// 代码生成时间: 2025-09-14 22:43:52
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

/**
 * Interface to define the structure of performance data.
 */
interface PerformanceData {
  cpuUsage: string;
  memoryUsage: string;
  storageUsage: string;
}

/**
 * Service to monitor system performance.
 */
@Injectable({
  providedIn: 'root'
})
export class SystemPerformanceMonitorService {
  private apiUrl: string = 'http://api.systemperformance.com/data';

  constructor(private http: HttpClient) {}

  /**
   * Fetches the performance data from the API.
   * @returns An Observable of PerformanceData.
   */
  getPerformanceData(): Observable<PerformanceData> {
    return this.http.get<PerformanceData>(this.apiUrl)
      .pipe(
        retry(3), // retry a failed request up to 3 times
        catchError(this.handleError) // handle any errors that occur
      );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      // so log it (calling `error.json()` will attempt to parse the JSON response body).
      console.error(
        `Backend returned code ${error.status}, `
        `body was: ${error.error}`
      );
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.'
    );
  }
}

/**
 * Component to display system performance data.
 */
import { Component, OnInit } from '@angular/core';
import { SystemPerformanceMonitorService, PerformanceData } from './system_performance_monitor.service';

@Component({
  selector: 'app-performance-monitor',
  template: `<p>
    Cpu Usage: {{ performanceData.cpuUsage }}<br>
    Memory Usage: {{ performanceData.memoryUsage }}<br>
    Storage Usage: {{ performanceData.storageUsage }}
  </p>`,
  styles: []
})
export class PerformanceMonitorComponent implements OnInit {
  performanceData: PerformanceData;
  error: string;

  constructor(private performanceService: SystemPerformanceMonitorService) {}

  ngOnInit(): void {
    this.performanceService.getPerformanceData().subscribe({
      next: (data) => {
        this.performanceData = data;
      },
      error: (err) => {
        this.error = err;
      }
    });
  }
}
