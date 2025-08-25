// 代码生成时间: 2025-08-25 16:35:45
import { Injectable } from '@angular/core';
import { Observable, timer, Subscription } from 'rxjs';
import { finalize, catchError } from 'rxjs/operators';

/**
 * Interface to define the structure of a scheduled task.
 */
interface ScheduledTask {
  execute: () => void;
  interval?: number;
  name?: string;
}

@Injectable({
  providedIn: 'root'
})
export class SchedulerService {

  private subscriptions: Subscription[] = [];

  /**
   * Schedule a new task to be executed periodically.
   * @param task The task to be executed.
   * @returns An observable to allow unsubscribing.
   */
  scheduleTask(task: ScheduledTask): Observable<any> {
    const { execute, interval, name } = task;
    if (!interval) {
      throw new Error('Interval must be provided for scheduled tasks.');
    }
    const observable = timer(0, interval).subscribe(execute);
    this.subscriptions.push(observable);
    return observable.pipe(
      finalize(() => this.subscriptions = this.subscriptions.filter(sub => sub !== observable)),
      catchError(error => {
        console.error(`Error executing scheduled task ${name}:`, error);
        throw error;
      })
    );
  }

  /**
   * Unsubscribe from all scheduled tasks.
   */
  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  /**
   * Execute a one-time task after a specified delay.
   * @param execute The task to be executed.
   * @param delay The delay before executing the task.
   * @returns An observable to allow unsubscribing.
   */
  scheduleOneTimeTask(execute: () => void, delay: number): Observable<any> {
    const observable = timer(delay).subscribe(execute);
    this.subscriptions.push(observable);
    return observable.pipe(
      finalize(() => this.subscriptions = this.subscriptions.filter(sub => sub !== observable)),
      catchError(error => {
        console.error('Error executing one-time task:', error);
        throw error;
      })
    );
  }
}
