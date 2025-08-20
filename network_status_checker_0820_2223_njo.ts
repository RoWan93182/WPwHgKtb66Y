// 代码生成时间: 2025-08-20 22:23:46
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

// NetworkStatusCheckerService is an injectable service that checks the network connection status.
@Injectable({
  providedIn: 'root',
})
export class NetworkStatusCheckerService {
  private isOnline: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  constructor(private http: HttpClient, private router: Router) {
    // Initial check for network connection.
    this.checkNetworkStatus();
  }

  // Checks the network connection status by making a request to a reliable endpoint.
  private checkNetworkStatus(): void {
    this.http.get('https://www.googleapis.com').pipe(
      switchMap(() => this.http.get('https://www.google.com'))
    ).subscribe({
      next: () => {
        this.isOnline.next(true);
      },
      error: (err) => {
        this.isOnline.next(false);
        // Handle error case, for example, navigate to an offline page.
        this.router.navigate(['/offline']);
      },
    });
  }

  // An observable that emits the current network status.
  public getNetworkStatus(): Observable<boolean> {
    return this.isOnline.asObservable();
  }
}

// Usage:
// this.networkStatusCheckerService.getNetworkStatus().subscribe(
//   isOnline => {
//     if (!isOnline) {
//       console.log('Network connection lost!');
//     } else {
//       console.log('Network connection regained!');
//     }
//   }
// );