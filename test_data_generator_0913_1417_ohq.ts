// 代码生成时间: 2025-09-13 14:17:20
import { Injectable } from '@angular/core';

// 测试数据生成器服务
@Injectable({
  providedIn: 'root'
})
export class TestDataGeneratorService {

  constructor() {}

  // 生成随机字符串
  private generateRandomString(length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }

  // 生成随机整数
  private generateRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // 生成随机日期
  private generateRandomDate(): Date {
    const start = new Date(2000, 0, 1);
    const end = new Date();
    const range = end.getTime() - start.getTime();
    const randomTime = Math.random() * range;
    return new Date(start.getTime() + randomTime);
  }

  // 生成测试用户数据
  public generateUserTestData(): any {
    try {
      const name = this.generateRandomString(10);
      const age = this.generateRandomNumber(18, 65);
      const email = `${name.toLowerCase()}@example.com`;
      const birthDate = this.generateRandomDate();

      return {
        name,
        age,
        email,
        birthDate: birthDate.toISOString()
      };
    } catch (error) {
      console.error('Error generating user test data:', error);
      throw error;
    }
  }

}

// 使用示例
// const testDataGeneratorService = new TestDataGeneratorService();
// const userData = testDataGeneratorService.generateUserTestData();
// console.log(userData);