// 代码生成时间: 2025-07-31 18:17:37
import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

/**
 * PasswordService provides functionality to encrypt and decrypt passwords.
 */
@Injectable({
  providedIn: 'root'
})
export class PasswordService {

  constructor() {}

  /**
   * Encrypts a password using AES algorithm.
   * @param password The password to encrypt.
   * @returns The encrypted password.
   */
  encryptPassword(password: string): string {
    try {
      // Define the key for AES encryption. This should be kept secure in real applications.
      const key = 'YourSecretKey';
      // Encrypt the password
      const encrypted = CryptoJS.AES.encrypt(password, key).toString();
      return encrypted;
    } catch (error) {
      console.error('Encryption failed:', error);
      throw new Error('Encryption failed: ' + error.message);
    }
  }

  /**
   * Decrypts a password using AES algorithm.
   * @param encryptedPassword The encrypted password to decrypt.
   * @returns The decrypted password.
   */
  decryptPassword(encryptedPassword: string): string {
    try {
      // Define the key for AES decryption. It should be the same as the encryption key.
      const key = 'YourSecretKey';
      // Decrypt the password
      const bytes = CryptoJS.AES.decrypt(encryptedPassword, key);
      const decrypted = bytes.toString(CryptoJS.enc.Utf8);
      return decrypted;
    } catch (error) {
      console.error('Decryption failed:', error);
      throw new Error('Decryption failed: ' + error.message);
    }
  }
}
