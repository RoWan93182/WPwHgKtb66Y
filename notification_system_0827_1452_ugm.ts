// 代码生成时间: 2025-08-27 14:52:09
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  // An enum to define the type of notification
  static readonly NotificationTypes = {
    INFO: 'INFO',
    SUCCESS: 'SUCCESS',
    WARNING: 'WARNING',
    ERROR: 'ERROR'
  } as const;

  // A Subject to hold the notifications
  private notificationsSubject = new Subject<Message>();

  // Observable to emit notifications
  public notifications$ = this.notificationsSubject.asObservable();

  constructor() {}

  /**
   * Method to send a notification message.
   *
   * @param message The actual message to be sent.
   * @param type The type of notification (info, success, warning, error).
   */
  public sendNotification(message: string, type: typeof NotificationService.NotificationTypes[keyof typeof NotificationService.NotificationTypes]): void {
    try {
      const notification: Message = {
        message: message,
        type: type
      };
      this.notificationsSubject.next(notification);
    } catch (error) {
      // Handle any errors in notification sending
      console.error('Error sending notification:', error);
    }
  }

  /**
   * Method to clear all notifications.
   */
  public clearNotifications(): void {
    this.notificationsSubject.next(null); // Sending null to clear the notifications
  }
}

/**
 * Message interface representing a notification message.
 */
interface Message {
  message: string;
  type: typeof NotificationService.NotificationTypes[keyof typeof NotificationService.NotificationTypes];
}

/**
 * Example of how to use NotificationService in a component.
 *
 * @example
 * constructor(private notificationService: NotificationService) {}
 *
 * sendNotification() {
 *   this.notificationService.sendNotification('A new message has arrived!', NotificationService.NotificationTypes.INFO);
 * }
 */