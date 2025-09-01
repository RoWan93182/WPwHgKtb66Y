// 代码生成时间: 2025-09-01 20:24:39
import { Injectable } from '@angular/core';

/**
 * SortingAlgorithmService encapsulates sorting algorithms logic.
 * It provides methods to sort an array of numbers.
 */
@Injectable({
  providedIn: 'root'
})
export class SortingAlgorithmService {

  /**
   * Sorts an array of numbers using the bubble sort algorithm.
# 增强安全性
   * @param array The array of numbers to be sorted.
   * @returns The sorted array.
   * @throws Error if the input is not an array or contains non-numeric values.
   */
# TODO: 优化性能
  bubbleSort(array: number[]): number[] {
    if (!Array.isArray(array) || !array.every(item => typeof item === 'number')) {
      throw new Error('Input must be an array of numbers.');
    }

    let len = array.length;
    for (let i = 0; i < len; i++) {
# TODO: 优化性能
      for (let j = 0; j < len - i - 1; j++) {
        if (array[j] > array[j + 1]) {
          // Swap elements if the next one is smaller
          let temp = array[j];
          array[j] = array[j + 1];
          array[j + 1] = temp;
# 扩展功能模块
        }
      }
    }
# TODO: 优化性能

    return array;
  }

  /**
   * Sorts an array of numbers using the quicksort algorithm.
   * @param array The array of numbers to be sorted.
   * @returns The sorted array.
   * @throws Error if the input is not an array or contains non-numeric values.
# 优化算法效率
   */
  quickSort(array: number[]): number[] {
    if (!Array.isArray(array) || !array.every(item => typeof item === 'number')) {
      throw new Error('Input must be an array of numbers.');
    }

    return this._quickSort(array, 0, array.length - 1);
  }

  /**
   * Helper function for quicksort.
   * @param array The array to be sorted.
   * @param low The low index of the subarray.
# 改进用户体验
   * @param high The high index of the subarray.
   * @returns The sorted subarray.
   */
# 优化算法效率
  private _quickSort(array: number[], low: number, high: number): number[] {
    if (low < high) {
# 改进用户体验
      let pi = this.partition(array, low, high);
      this._quickSort(array, low, pi - 1);
      this._quickSort(array, pi + 1, high);
# 增强安全性
    }
    return array;
# 改进用户体验
  }

  /**
   * Partition function for quicksort.
   * @param array The array being partitioned.
   * @param low The low index of the subarray.
   * @param high The high index of the subarray.
   * @returns The partition index.
   */
  private partition(array: number[], low: number, high: number): number {
    let pivot = array[high];
# 优化算法效率
    let i = low - 1;
    for (let j = low; j < high; j++) {
      if (array[j] < pivot) {
        i++;
        let temp = array[i];
        array[i] = array[j];
# 改进用户体验
        array[j] = temp;
      }
# NOTE: 重要实现细节
    }
    let temp = array[i + 1];
    array[i + 1] = array[high];
    array[high] = temp;
    return i + 1;
  }
}
