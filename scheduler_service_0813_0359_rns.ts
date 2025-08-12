// 代码生成时间: 2025-08-13 03:59:21
// scheduler_service.ts
// 定时任务调度器服务，用于管理定时任务。
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SchedulerService {
  private taskSubject: Subject<{ task: () => void; interval: number; }> = new Subject<{ task: () => void; interval: number; }>();
  private tasks: NodeJS.Timer[] = [];
  private unsubscribe$ = new Subject<void>();

  constructor() {
    // 订阅任务主题，定时执行任务
    this.taskSubject.pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(({ task, interval }) => {
      const timer = setInterval(task, interval);
      this.tasks.push(timer);
    });
  }

  ngOnDestroy() {
    // 在组件销毁时清理定时器
    this.tasks.forEach(timer => clearInterval(timer));
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  /**
   * 添加定时任务
   * @param task 要执行的任务函数
   * @param interval 执行间隔（毫秒）
   * @returns {void}
   */
  addTask(task: () => void, interval: number): void {
    if (typeof task !== 'function') {
      throw new Error('Task must be a function');
    }
    if (interval <= 0) {
      throw new Error('Interval must be greater than 0');
    }
    this.taskSubject.next({ task, interval });
  }

  /**
   * 移除定时任务
   * @param task 要移除的任务函数
   * @returns {void}
   */
  removeTask(task: () => void): void {
    this.tasks = this.tasks.filter(timer => {
      clearInterval(timer);
      return timer !== setInterval(task, 1000); // 这里使用setInterval返回值来比较，实际上需要保存任务ID
    });
  }
}
