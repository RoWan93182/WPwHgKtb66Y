// 代码生成时间: 2025-09-02 18:15:35
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { filter, map, take, tap } from 'rxjs/operators';

/**
 * Notification message interface.
 * Defines the structure of a notification message.
 */
interface NotificationMessage {
  id: number;
  message: string;
  type: 'info' | 'warning' | 'error';
}

@Injectable({
  providedIn: 'root'
})
export class NotificationSystem {
  private notificationSource = new Subject<NotificationMessage>();
  notifications$ = this.notificationSource.asObservable();

  /**
   * Posts a new notification message.
   * @param message The notification message to post.
   */
  postNotification(message: NotificationMessage): void {
    this.notificationSource.next(message);
  }

  /**
   * Gets a notification by its ID.
   * @param id The ID of the notification to retrieve.
   * @returns The notification message if found, otherwise undefined.
   */
  getNotificationById(id: number): NotificationMessage | undefined {
    const notification = this.notifications$.pipe(
      filter(notification => notification.id === id),
      take(1),
    ).toPromise();
    return notification;
  }

  /**
   * Clears all notifications.
   */
  clearAllNotifications(): void {
    this.notificationSource.next({
      id: -1, // Special ID to indicate a clear action.
      message: 'All notifications cleared.',
      type: 'info',
    });
  }

  /**
   * Subscribes to notifications and handles them.
   * @param callback The callback function to handle each notification.
   */
  handleNotifications(callback: (message: NotificationMessage) => void): void {
    this.notifications$.pipe(
      tap(callback), // Use tap to handle notifications as they come in.
    ).subscribe();
  }

  /**
   * Error handling for subscription errors.
   */
  handleError(): void {
    this.notifications$.pipe(
      tap(null, (error: any) => {
        console.error('Notification error:', error);
      }),
    ).subscribe();
  }
}
