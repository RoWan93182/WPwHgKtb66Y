// 代码生成时间: 2025-08-30 23:50:43
// math_tool_service.ts

// 导入Angular核心模块
import { Injectable } from '@angular/core';

/**
 * MathToolService 提供一系列数学计算工具
 */
@Injectable({
  providedIn: 'root'
})
export class MathToolService {

  /**
   * 计算两个数字的和
   * @param a 第一个加数
   * @param b 第二个加数
   * @returns 两个数字的和
   */
  add(a: number, b: number): number {
    if (isNaN(a) || isNaN(b)) {
      throw new Error('Both a and b must be numbers');
    }
    return a + b;
  }

  /**
   * 计算两个数字的差
   * @param a 被减数
   * @param b 减数
   * @returns 两个数字的差
   */
  subtract(a: number, b: number): number {
    if (isNaN(a) || isNaN(b)) {
      throw new Error('Both a and b must be numbers');
    }
    return a - b;
  }

  /**
   * 计算两个数字的乘积
   * @param a 第一个乘数
   * @param b 第二个乘数
   * @returns 两个数字的乘积
   */
  multiply(a: number, b: number): number {
    if (isNaN(a) || isNaN(b)) {
      throw new Error('Both a and b must be numbers');
    }
    return a * b;
  }

  /**
   * 计算两个数字的商
   * @param a 被除数
   * @param b 除数
   * @returns 两个数字的商
   */
  divide(a: number, b: number): number {
    if (isNaN(a) || isNaN(b)) {
      throw new Error('Both a and b must be numbers');
    }
    if (b === 0) {
      throw new Error('Division by zero is not allowed');
    }
    return a / b;
  }

  /**
   * 计算数字的绝对值
   * @param a 需要求绝对值的数字
   * @returns 数字的绝对值
   */
  abs(a: number): number {
    if (isNaN(a)) {
      throw new Error('Input must be a number');
    }
    return Math.abs(a);
  }

  /**
   * 计算数字的平方
   * @param a 需要求平方的数字
   * @returns 数字的平方
   */
  square(a: number): number {
    if (isNaN(a)) {
      throw new Error('Input must be a number');
    }
    return a * a;
  }

  /**
   * 计算数字的立方
   * @param a 需要求立方的数字
   * @returns 数字的立方
   */
  cube(a: number): number {
    if (isNaN(a)) {
      throw new Error('Input must be a number');
    }
    return a * a * a;
  }
}
