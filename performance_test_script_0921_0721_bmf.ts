// 代码生成时间: 2025-09-21 07:21:31
import { Injectable } from '@angular/core';

// Define a type for a performance metric
type PerformanceMetric = {
  action: string;
  duration: number;
};

@Injectable({
  providedIn: 'root'
})
export class PerformanceTestingService {

  private metrics: PerformanceMetric[] = [];

  constructor() {}

  /**
   * Simulate a user action and record the time taken
   *
   * @param action The name of the action being performed
   */
  simulateAction(action: string): void {
    const start = performance.now();
    // Simulate the action with a delay to mimic user interaction
    setTimeout(() => {
      const duration = performance.now() - start;
      this.logMetric(action, duration);
    }, 100);
  }

  /**
   * Log a performance metric
   *
   * @param action The action that was performed
   * @param duration The time taken to complete the action
   */
  private logMetric(action: string, duration: number): void {
    const metric: PerformanceMetric = {
      action,
      duration
    };
    this.metrics.push(metric);
    console.log(`Action: ${action}, Duration: ${duration}ms`);
  }

  /**
   * Get all recorded performance metrics
   *
   * @returns An array of performance metrics
   */
  getMetrics(): PerformanceMetric[] {
    return this.metrics;
  }

  /**
   * Clear all recorded performance metrics
   */
  clearMetrics(): void {
    this.metrics = [];
  }
}

// Example usage:
// const perfService = new PerformanceTestingService();
// perfService.simulateAction('User login');
// perfService.simulateAction('Data fetch');
// console.log(perfService.getMetrics());