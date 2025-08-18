// 代码生成时间: 2025-08-18 10:18:20
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExampleService {

  constructor() {}

  /**
   * Returns a simple greeting
   * @returns {string} A greeting message
   */
  public getGreeting(): string {
    return 'Hello from ExampleService!';
  }

  /**
   * Simulates an asynchronous operation
   * @returns {Promise<string>} A promise that resolves to a greeting message
   */
  public asyncGetGreeting(): Promise<string> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve('Hello asynchronously from ExampleService!');
      }, 1000);
    });
  }
}
