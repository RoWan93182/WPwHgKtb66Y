// 代码生成时间: 2025-09-22 10:20:14
import { Injectable } from '@angular/core';

/**
 * SortingService provides a centralized place for sorting algorithms.
 * It is designed to be easily extendable and maintainable.
 */
@Injectable({
  providedIn: 'root'
})
export class SortingService {

  /**
   * Sorts an array of numbers using the Bubble Sort algorithm.
   * @param numbers The array of numbers to sort.
   * @returns A sorted array of numbers.
   */
  public bubbleSort(numbers: number[]): number[] {
    if (!Array.isArray(numbers) || numbers.length === 0) {
      throw new Error('Invalid input: Please provide a non-empty array of numbers.');
    }

    let swapped: boolean;
    do {
      swapped = false;
      for (let i = 0; i < numbers.length - 1; i++) {
        if (numbers[i] > numbers[i + 1]) {
          // Swap
          [numbers[i], numbers[i + 1]] = [numbers[i + 1], numbers[i]];
          swapped = true;
        }
      }
    } while (swapped);

    return numbers;
  }

  /**
   * Sorts an array of numbers using the Quick Sort algorithm.
   * @param numbers The array of numbers to sort.
   * @param left The starting index.
   * @param right The ending index.
   * @returns A sorted array of numbers.
   */
  private quickSortHelper(numbers: number[], left: number, right: number): number[] {
    if (left < right) {
      let pivotIndex = this.partition(numbers, left, right);
      this.quickSortHelper(numbers, left, pivotIndex - 1);
      this.quickSortHelper(numbers, pivotIndex + 1, right);
    }
    return numbers;
  }

  /**
   * Partitions the array for the Quick Sort algorithm.
   * @param numbers The array of numbers to partition.
   * @param left The starting index.
   * @param right The ending index.
   * @returns The pivot index.
   */
  private partition(numbers: number[], left: number, right: number): number {
    const pivot = numbers[right];
    let partitionIndex = left;
    for (let i = left; i < right; i++) {
      if (numbers[i] < pivot) {
        [numbers[i], numbers[partitionIndex]] = [numbers[partitionIndex], numbers[i]];
        partitionIndex++;
      }
    }
    [numbers[partitionIndex], numbers[right]] = [numbers[right], numbers[partitionIndex]];
    return partitionIndex;
  }

  /**
   * Sorts an array of numbers using the Quick Sort algorithm.
   * @param numbers The array of numbers to sort.
   * @returns A sorted array of numbers.
   */
  public quickSort(numbers: number[]): number[] {
    if (!Array.isArray(numbers) || numbers.length === 0) {
      throw new Error('Invalid input: Please provide a non-empty array of numbers.');
    }

    return this.quickSortHelper(numbers, 0, numbers.length - 1);
  }
}
