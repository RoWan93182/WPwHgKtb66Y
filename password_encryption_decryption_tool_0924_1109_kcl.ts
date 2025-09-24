// 代码生成时间: 2025-09-24 11:09:50
import { Injectable } from '@angular/core';

// 密码加密解密工具服务
@Injectable({
  providedIn: 'root',
})
export class PasswordEncryptionDecryptionToolService {

  constructor() { }

  /**
   * 使用CryptoJS的AES算法加密密码
   * @param password 需要加密的密码
   * @param secretKey 加密使用的密钥
   * @returns 加密后的密码
   */
  encryptPassword(password: string, secretKey: string): string {
    try {
      const encrypted = CryptoJS.AES.encrypt(password, secretKey);
      return encrypted.toString();
    } catch (error) {
      console.error('Encryption failed:', error);
      throw new Error('Encryption failed');
    }
  }

  /**
   * 使用CryptoJS的AES算法解密密码
   * @param encryptedPassword 加密后的密码
   * @param secretKey 解密使用的密钥
   * @returns 解密后的密码
   */
  decryptPassword(encryptedPassword: string, secretKey: string): string {
    try {
      const bytes = CryptoJS.AES.decrypt(encryptedPassword, secretKey);
      const originalText = bytes.toString(CryptoJS.enc.Utf8);
      return originalText;
    } catch (error) {
      console.error('Decryption failed:', error);
      throw new Error('Decryption failed');
    }
  }
}
