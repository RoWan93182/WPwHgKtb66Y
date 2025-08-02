// 代码生成时间: 2025-08-02 18:40:02
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, map, shareReplay } from 'rxjs/operators';

/**
 * NetworkConnectionCheckerService is a service that provides information about the current network connection status.
 * It uses the `navigator.onLine` property to determine if the browser is online or offline.
 */
@Injectable({
  providedIn: 'root'
})
export class NetworkConnectionCheckerService {
  private onlineSubject = new BehaviorSubject<boolean>(navigator.onLine);

  /**
   * An Observable stream that emits the current online status.
   * It emits true when online and false when offline.
   */
  online$: Observable<boolean>;

  constructor() {
    // This will automatically subscribe to the online and offline events and update the BehaviorSubject accordingly.
    window.addEventListener('online', this.handleOnline.bind(this));
    window.addEventListener('offline', this.handleOffline.bind(this));

    // Creating a shared Observable to avoid multiple subscriptions.
    this.online$ = this.onlineSubject.asObservable().pipe(
      distinctUntilChanged(),
      shareReplay({ bufferSize: 1, refCount: true })
    );
  }

  /**
   * Handle the online event and emit true through the BehaviorSubject.
   */
  private handleOnline(): void {
    this.onlineSubject.next(true);
  }

  /**
   * Handle the offline event and emit false through the BehaviorSubject.
   */
  private handleOffline(): void {
    this.onlineSubject.next(false);
  }

  /**
   * Manually check the network status and return an Observable.
   * This is useful for initial checks or when an immediate check is needed.
   * @returns An Observable that emits the current online status.
   */
  checkNetworkStatus(): Observable<boolean> {
    return this.online$.pipe(
      map(online => ({ online })) // Wrap the value in an object for consistency with other Observable emissions.
    );
  }
}
