// 代码生成时间: 2025-08-02 23:51:31
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';

// NotificationService负责管理应用内的消息通知
@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  // 使用BehaviorSubject来存储当前通知消息
  private notificationSubject = new BehaviorSubject<string | null>(null);

  // 暴露Observable，订阅者可以监听通知变化
  public notification$: Observable<string | null> = this.notificationSubject.asObservable();

  constructor() {}

  // 发送通知消息
  public sendNotification(message: string): void {
    // 将新消息设置为当前通知
    this.notificationSubject.next(message);
  }

  // 清除通知消息
  public clearNotification(): void {
    // 将当前通知设置为null
    this.notificationSubject.next(null);
  }

  // 订阅通知，并处理可能发生的错误
  public subscribeToNotification(): Observable<string | null> {
    return this.notification$.pipe(
      switchMap(notification => {
        // 这里可以添加错误处理逻辑
        if (notification) {
          return of(notification);
        } else {
          throw new Error('No notification available');
       }
      }),
      catchError(error => {
        // 错误处理逻辑
        console.error('Notification error:', error);
        return of(null);
      }),
    );
  }
}
