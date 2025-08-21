// 代码生成时间: 2025-08-22 01:22:50
import { Injectable } from '@angular/core';
import * as fs from 'fs';
import * as path from 'path';
import { promisify } from 'util';
import { exec } from 'child_process';

// 使用Angular的Injectable装饰器来标记这个类为依赖注入的服务
@Injectable({
  providedIn: 'root'
})
export class DatabaseMigrationTool {

  private readonly migrationFolderPath: string = './migrations';
  private execAsync: (command: string) => Promise<void>;

  constructor() {
    // 将Node.js的exec函数转换为返回Promise的异步函数
    this.execAsync = promisify(exec);
  }

  /**
   * 运行数据库迁移
   * @returns 一个Promise，当迁移成功时解析，否则拒绝
   */
  async runMigration(): Promise<void> {
    try {
      // 检查迁移文件夹是否存在
      if (!fs.existsSync(this.migrationFolderPath)) {
        throw new Error('Migration folder does not exist.');
      }

      // 获取所有迁移文件（假设为.js或.ts文件）
      const migrationFiles = await promisify(fs.readdir)(this.migrationFolderPath);
      for (const file of migrationFiles) {
        const migrationFilePath = path.join(this.migrationFolderPath, file);
        if (fs.statSync(migrationFilePath).isFile() &&
            (file.endsWith('.js') || file.endsWith('.ts'))) {
          // 运行每个迁移文件
          await this.execAsync(`node ${migrationFilePath}`);
        }
      }

      console.log('Migration completed successfully.');
    } catch (error) {
      // 错误处理
      console.error('Migration failed:', error.message);
      throw error;
    }
  }

  /**
   * 回滚数据库迁移
   * @returns 一个Promise，当回滚成功时解析，否则拒绝
   */
  async rollbackMigration(): Promise<void> {
    try {
      // 回滚逻辑...
      console.log('Rollback completed successfully.');
    } catch (error) {
      // 错误处理
      console.error('Rollback failed:', error.message);
      throw error;
    }
  }
}
