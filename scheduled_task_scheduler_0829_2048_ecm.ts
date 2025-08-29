// 代码生成时间: 2025-08-29 20:48:23
import { Injectable } from '@angular/core';
import { NgZone } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';

// 定时任务调度器服务
@Injectable({
  providedIn: 'root'
})
export class ScheduledTaskSchedulerService {

  // 构造函数
  constructor(private zone: NgZone) {}

  /**
   * 执行定时任务
   * @param delay 延迟时间（毫秒）
   * @param task 需要执行的任务函数
   * @returns 任务执行结果的Observable
   */
  executeScheduledTask<T>(delay: number, task: () => T): Observable<T> {
    return timer(delay).pipe(
      // 在Angular变更检测区域外执行任务
      switchMap(() => this.zone.runOutsideAngular(() => {
        try {
          // 执行任务并返回结果
          return task();
        } catch (error) {
          // 捕获并抛出错误
          throw error;
        }
      })),
      // 处理错误
      catchError(error => {
        console.error('Scheduled task error:', error);
        return Observable.throw(error);
      }),
    );
  }
}

// 使用示例
// 可以在这个模块中注入ScheduledTaskSchedulerService并使用executeScheduledTask方法
// import { ScheduledTaskSchedulerService } from './scheduled_task_scheduler';
// constructor(private taskScheduler: ScheduledTaskSchedulerService) {}
// this.taskScheduler.executeScheduledTask(5000, () => {
//   return 'Task result';
// }).subscribe(result => {
//   console.log(result);
// }, error => {
//   console.error(error);
// });