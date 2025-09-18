// 代码生成时间: 2025-09-18 22:55:33
export class SortingAlgorithmService {

  /**
   * Bubble Sort Implementation
   * @param {number[]} array The array to be sorted.
   * @returns {number[]} The sorted array using Bubble Sort algorithm.
   */
  public bubbleSort(array: number[]): number[] {
    if (!Array.isArray(array)) {
      throw new Error('Input must be an array.');
    }

    const sortedArray = [...array];
    for (let i = 0; i < sortedArray.length; i++) {
      for (let j = 0; j < sortedArray.length - i - 1; j++) {
        if (sortedArray[j] > sortedArray[j + 1]) {
          // Swap the elements
          [sortedArray[j], sortedArray[j + 1]] = [sortedArray[j + 1], sortedArray[j]];
        }
      }
    }
    return sortedArray;
  }

  /**
   * Insertion Sort Implementation
   * @param {number[]} array The array to be sorted.
   * @returns {number[]} The sorted array using Insertion Sort algorithm.
   */
  public insertionSort(array: number[]): number[] {
    if (!Array.isArray(array)) {
      throw new Error('Input must be an array.');
    }

    const sortedArray = [...array];
    for (let i = 1; i < sortedArray.length; i++) {
      let current = sortedArray[i];
      let j = i - 1;

      while (j >= 0 && sortedArray[j] > current) {
        sortedArray[j + 1] = sortedArray[j];
        j--;
      }
      sortedArray[j + 1] = current;
    }
    return sortedArray;
  }

  /**
   * Merge Sort Implementation
   * @param {number[]} array The array to be sorted.
   * @returns {number[]} The sorted array using Merge Sort algorithm.
   */
  public mergeSort(array: number[]): number[] {
    if (!Array.isArray(array)) {
      throw new Error('Input must be an array.');
    }

    if (array.length <= 1) {
      return array;
    }

    const middle = Math.floor(array.length / 2);
    const left = array.slice(0, middle);
    const right = array.slice(middle);

    return this.merge(this.mergeSort(left), this.mergeSort(right));
  }

  /**
   * Helper function to merge two sorted arrays.
   * @param {number[]} left The first array to merge.
   * @param {number[]} right The second array to merge.
   * @returns {number[]} The merged sorted array.
   */
  private merge(left: number[], right: number[]): number[] {
    const result: number[] = [];
    let leftIndex = 0;
    let rightIndex = 0;

    while (leftIndex < left.length && rightIndex < right.length) {
      if (left[leftIndex] < right[rightIndex]) {
        result.push(left[leftIndex++]);
      } else {
        result.push(right[rightIndex++]);
      }
    }

    return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
  }

  /**
   * Selection Sort Implementation
   * @param {number[]} array The array to be sorted.
   * @returns {number[]} The sorted array using Selection Sort algorithm.
   */
  public selectionSort(array: number[]): number[] {
    if (!Array.isArray(array)) {
      throw new Error('Input must be an array.');
    }

    const sortedArray = [...array];
    for (let i = 0; i < sortedArray.length - 1; i++) {
      let minIndex = i;
      for (let j = i + 1; j < sortedArray.length; j++) {
        if (sortedArray[j] < sortedArray[minIndex]) {
          minIndex = j;
        }
      }
      if (minIndex !== i) {
        // Swap the elements
        [sortedArray[i], sortedArray[minIndex]] = [sortedArray[minIndex], sortedArray[i]];
      }
    }
    return sortedArray;
  }
}