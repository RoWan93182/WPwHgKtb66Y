// 代码生成时间: 2025-08-18 17:19:52
import { Component } from '@angular/core';

@Component({
  selector: 'app-sorting-algorithm',
  templateUrl: './sorting-algorithm.component.html',
  styleUrls: ['./sorting-algorithm.component.css']
})
export class SortingAlgorithmComponent {
  // 定义一个数组用于存储数字
  private numbers: number[] = [];

  constructor() {
    // 初始化数组
    this.numbers = this.generateRandomNumbers(10);
  }

  // 生成指定数量的随机数
  private generateRandomNumbers(count: number): number[] {
    const numbers: number[] = [];
    for (let i = 0; i < count; i++) {
      numbers.push(Math.floor(Math.random() * 100));
    }
    return numbers;
  }

  // 执行冒泡排序
  bubbleSort(): void {
    const length = this.numbers.length;
    for (let i = 0; i < length; i++) {
      for (let j = 0; j < length - i - 1; j++) {
        if (this.numbers[j] > this.numbers[j + 1]) {
          // 交换元素
          this.swap(j, j + 1);
        }
      }
    }
  }

  // 交换数组中的两个元素
  private swap(index1: number, index2: number): void {
    const temp = this.numbers[index1];
    this.numbers[index1] = this.numbers[index2];
    this.numbers[index2] = temp;
  }

  // 获取排序后的数组
  getSortedNumbers(): number[] {
    this.bubbleSort();
    return this.numbers;
  }

  // 打印排序后的数组
  printSortedNumbers(): void {
    const sortedNumbers = this.getSortedNumbers();
    console.log('Sorted Numbers:', sortedNumbers);
  }

  // 错误处理示例：确保数组不为空
  private ensureArrayNotEmpty(): void {
    if (this.numbers.length === 0) {
      throw new Error('Array is empty, cannot perform sorting.');
    }
  }
}
