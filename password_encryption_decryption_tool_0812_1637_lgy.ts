// 代码生成时间: 2025-08-12 16:37:36
import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class PasswordEncryptionDecryptionService {

  /**
   * Encrypts a password using AES encryption.
   * @param password The password to encrypt.
   * @param secretKey The secret key used for encryption.
   * @returns The encrypted password.
   */
  encryptPassword(password: string, secretKey: string): string {
    try {
      const encrypted = CryptoJS.AES.encrypt(password, secretKey);
      return encrypted.toString();
    } catch (error) {
      console.error('Encryption failed:', error);
      throw new Error('Encryption failed.');
    }
  }

  /**
   * Decrypts a password using AES decryption.
   * @param encryptedPassword The encrypted password to decrypt.
   * @param secretKey The secret key used for decryption.
   * @returns The decrypted password.
   */
  decryptPassword(encryptedPassword: string, secretKey: string): string {
    try {
      const bytes = CryptoJS.AES.decrypt(encryptedPassword, secretKey);
      const decrypted = bytes.toString(CryptoJS.enc.Utf8);
      return decrypted;
    } catch (error) {
      console.error('Decryption failed:', error);
      throw new Error('Decryption failed.');
    }
  }
}
