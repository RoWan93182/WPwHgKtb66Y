// 代码生成时间: 2025-08-26 09:03:27
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-random-number-generator',
  template: `
    <div>
      <input type="number" [(ngModel)]="min" placeholder="Enter minimum value">
      <input type="number" [(ngModel)]="max" placeholder="Enter maximum value">
      <button (click)="generateNumber()">
        Generate Random Number
      </button>
      <p>Random Number: {{ randomNumber }}</p>
    </div>
  `,
  styles: []
})
export class RandomNumberGeneratorComponent implements OnInit {
  // 定义最小值和最大值变量
  min: number;
  max: number;
  // 定义随机数变量
  randomNumber: number;

  constructor() { }

  /**
   * 组件初始化函数
   */
  ngOnInit(): void {
    // 默认最小值为1，最大值为100
    this.min = 1;
    this.max = 100;
  }

  /**
   * 生成随机数函数
   *
   * @returns {void}
   */
  generateNumber(): void {
    if (this.min && this.max && this.min < this.max) {
      // 确保最小值小于最大值
      this.randomNumber = Math.floor(Math.random() * (this.max - this.min + 1) + this.min);
    } else {
      // 错误处理：无效的输入
      console.error('Invalid input. Please ensure the minimum value is less than the maximum value.');
    }
  }
}
