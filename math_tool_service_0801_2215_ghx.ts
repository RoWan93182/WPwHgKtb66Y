// 代码生成时间: 2025-08-01 22:15:05
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MathToolService {

  constructor() {}

  /*
   * Adds two numbers together.
   * @param a The first number.
   * @param b The second number.
   * @returns The sum of the two numbers.
   * @throws Error if either number is not a number.
   */
  add(a: number, b: number): number {
    if (typeof a !== 'number' || typeof b !== 'number') {
      throw new Error('Both arguments must be numbers.');
    }
    return a + b;
  }

  /*
   * Subtracts the second number from the first.
   * @param a The first number (minuend).
   * @param b The second number (subtrahend).
   * @returns The difference between the two numbers.
   * @throws Error if either number is not a number.
   */
  subtract(a: number, b: number): number {
    if (typeof a !== 'number' || typeof b !== 'number') {
      throw new Error('Both arguments must be numbers.');
    }
    return a - b;
  }

  /*
   * Multiplies two numbers together.
   * @param a The first number.
   * @param b The second number.
   * @returns The product of the two numbers.
   * @throws Error if either number is not a number.
   */
  multiply(a: number, b: number): number {
    if (typeof a !== 'number' || typeof b !== 'number') {
      throw new Error('Both arguments must be numbers.');
    }
    return a * b;
  }

  /*
   * Divides the first number by the second.
   * @param a The first number (dividend).
   * @param b The second number (divisor).
   * @returns The quotient of the two numbers.
   * @throws Error if either number is not a number or if divisor is zero.
   */
  divide(a: number, b: number): number {
    if (typeof a !== 'number' || typeof b !== 'number') {
      throw new Error('Both arguments must be numbers.');
    }
    if (b === 0) {
      throw new Error('Division by zero is not allowed.');
    }
    return a / b;
  }

  /*
   * Calculates the modulus of the division of two numbers.
   * @param a The dividend.
   * @param b The divisor.
   * @returns The remainder of the division.
   * @throws Error if either number is not a number or if divisor is zero.
   */
  modulus(a: number, b: number): number {
    if (typeof a !== 'number' || typeof b !== 'number') {
      throw new Error('Both arguments must be numbers.');
    }
    if (b === 0) {
      throw new Error('Division by zero is not allowed.');
    }
    return a % b;
  }
}
