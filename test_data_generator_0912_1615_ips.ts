// 代码生成时间: 2025-09-12 16:15:19
import { Injectable } from '@angular/core';

// 测试数据生成器服务
@Injectable({
  providedIn: 'root'
})
export class TestDataGeneratorService {
  // 生成随机字符串
  private static generateRandomString(length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }

  // 生成随机数字
  private static generateRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // 生成测试用户数据
  generateTestUserData(count: number): any[] {
    const users = [];
    for (let i = 0; i < count; i++) {
      try {
        users.push({
          id: TestDataGeneratorService.generateRandomString(5),
          name: TestDataGeneratorService.generateRandomString(10),
          age: TestDataGeneratorService.generateRandomNumber(18, 70),
          email: TestDataGeneratorService.generateRandomString(10) + '@example.com'
        });
      } catch (error) {
        console.error('Error generating test user data:', error);
      }
    }
    return users;
  }

  // 生成测试商品数据
  generateTestProductData(count: number): any[] {
    const products = [];
    for (let i = 0; i < count; i++) {
      try {
        products.push({
          id: TestDataGeneratorService.generateRandomString(5),
          name: TestDataGeneratorService.generateRandomString(15),
          price: TestDataGeneratorService.generateRandomNumber(1, 1000),
          description: TestDataGeneratorService.generateRandomString(50)
        });
      } catch (error) {
        console.error('Error generating test product data:', error);
      }
    }
    return products;
  }
}
