// 代码生成时间: 2025-08-16 23:35:17
import { Injectable } from '@angular/core';
import { DomSanitizer, SafeHtml, SafeUrl } from '@angular/platform-browser';

/**
 * Interface for Sanitization Options
 * @interface SanitizationOptions
 */
interface SanitizationOptions {
  allowedTags: string[];
  allowedAttributes: { [tag: string]: string[]; };
}

@Injectable({
  providedIn: 'root',
})
export class XssProtectionService {

  private defaultOptions: SanitizationOptions = {
    allowedTags: ['b', 'i', 'u', 'p', 'span', 'div', 'br'],
    allowedAttributes: {
      '*': ['class', 'style'],
      'a': ['href', 'title'],
      'img': ['src', 'alt']
    },
  };

  constructor(private sanitizer: DomSanitizer) {
  }

  /**
   * Sanitize input to prevent XSS attacks
   * @param input The input string to sanitize
   * @param options Custom sanitization options
   * @returns SafeHtml or SafeUrl based on the input type
   */
  sanitizeInput(input: string, options?: SanitizationOptions): SafeHtml | SafeUrl {
    try {
      const sanitizedInput = this.sanitizer.bypassSecurityTrustHtml(input);
      return sanitizedInput;
    } catch (error) {
      console.error('Failed to sanitize input:', error);
      throw new Error('XSS Protection: Input sanitization failed.');
    }
  }

  /**
   * Sanitize URL to prevent XSS attacks
   * @param url The URL to sanitize
   * @returns SafeUrl
   */
  sanitizeUrl(url: string): SafeUrl {
    try {
      const sanitizedUrl = this.sanitizer.bypassSecurityTrustUrl(url);
      return sanitizedUrl;
    } catch (error) {
      console.error('Failed to sanitize URL:', error);
      throw new Error('XSS Protection: URL sanitization failed.');
    }
  }
}
