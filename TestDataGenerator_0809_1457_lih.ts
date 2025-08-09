// 代码生成时间: 2025-08-09 14:57:33
// TestDataGenerator.ts
import { Injectable } from '@angular/core';

/**
 * Service to generate test data.
 * This service adheres to TypeScript best practices,
 * Angular service conventions, and includes error handling.
 */
@Injectable({
  providedIn: 'root'
})
export class TestDataGeneratorService {

  // Generates a random string of specified length.
  private generateRandomString(length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }

  // Generates a random number within the specified range.
  private generateRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // Generates a random date within the specified range.
  private generateRandomDate(start: Date, end: Date): Date {
    return new Date(start.getTime() + this.generateRandomNumber(0, end.getTime() - start.getTime()));
  }

  // Public method to generate a random user.
  public generateRandomUser(): any {
    try {
      return {
        id: this.generateRandomString(10),
        name: this.generateRandomString(20),
        age: this.generateRandomNumber(18, 75),
        email: this.generateRandomString(10) + '@example.com',
        joinDate: this.generateRandomDate(new Date('2020-01-01'), new Date())
      };
    } catch (error) {
      console.error('Error generating random user:', error);
      throw new Error('Failed to generate random user due to an internal error.');
    }
  }

  // Public method to generate a list of random users.
  public generateRandomUsers(count: number): any[] {
    try {
      const users = [];
      for (let i = 0; i < count; i++) {
        users.push(this.generateRandomUser());
      }
      return users;
    } catch (error) {
      console.error('Error generating random users:', error);
      throw new Error('Failed to generate random users due to an internal error.');
    }
  }

}
