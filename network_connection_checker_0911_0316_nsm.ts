// 代码生成时间: 2025-09-11 03:16:23
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NetworkConnectionCheckerService {

  // Property to store the current network status
  private networkStatus = navigator.onLine;

  // BehaviorSubject to emit network status changes
  private networkStatusSubject = new BehaviorSubject<boolean>(this.networkStatus);
  public networkStatus$ = this.networkStatusSubject.asObservable();

  constructor() {
    // Subscribe to 'offline' and 'online' events to update the network status
    window.addEventListener('offline', this.handleNetworkStatusChange.bind(this, false));
    window.addEventListener('online', this.handleNetworkStatusChange.bind(this, true));
  }

  /**
   * Check if the current network status is online.
   * @returns {boolean} The current network status.
   */
  checkNetworkStatus(): boolean {
    return navigator.onLine;
  }

  /**
   * Handle the network status change by updating the BehaviorSubject and the network status property.
   * @param {boolean} status The new network status.
   */
  private handleNetworkStatusChange(status: boolean): void {
    this.networkStatus = status;
    this.networkStatusSubject.next(status);
  }

  /**
   * Method to subscribe to network status changes.
   * @returns {Observable<boolean>} An observable that emits the network status.
   */
  subscribeToNetworkStatusChanges(): Observable<boolean> {
    return this.networkStatus$;
  }
}

/**
 * Import the necessary dependencies for the RxJS BehaviorSubject and Observable.
 */
import { BehaviorSubject, Observable } from 'rxjs';