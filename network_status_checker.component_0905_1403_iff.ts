// 代码生成时间: 2025-09-05 14:03:48
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-network-status-checker',
  templateUrl: './network-status-checker.component.html',
  styleUrls: ['./network-status-checker.component.css']
})
export class NetworkStatusCheckerComponent implements OnInit {
  // Property to store the network status
  networkStatus: string;

  constructor(private http: HttpClient, private router: Router) {
  }

  ngOnInit() {
    this.checkNetworkStatus();
  }

  /**
   * Check network connection status by attempting to fetch data from a URL.
   * If the fetch operation is successful, the network is online.
   * If the fetch operation fails, the network is offline.
   */
  checkNetworkStatus() {
    const testURL = 'https://www.googleapis.com'; // A reliable URL to test connection
    this.http.get(testURL).pipe(
      catchError(error => {
        // If an error is caught, the network is offline
        this.networkStatus = 'Offline';
        return of(null); // Return an Observable to maintain the pipe flow
      }),
      map(response => {
        // If the response is received, the network is online
        this.networkStatus = 'Online';
      })
    ).subscribe();
  }
}
