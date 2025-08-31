// 代码生成时间: 2025-08-31 09:41:11
import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

// Define an interface for the JSON data
interface JsonData {
  [key: string]: any;
}

@Injectable({
  providedIn: 'root'
})
export class JsonConverterService {

  constructor() {}

  /**
   * Converts the input JSON data to the specified format.
   * @param jsonData The JSON data to be converted.
   * @param format The desired format of the output.
   * @returns The converted JSON data.
   */
  convertJsonData(jsonData: JsonData, format: string): JsonData | null {
    try {
      // Check if the jsonData is valid JSON object
      if (typeof jsonData !== 'object' || jsonData === null) {
        throw new Error('Invalid JSON data.');
      }

      // Implement the conversion logic based on the format
      switch (format) {
        case 'camelCase':
          return this.toCamelCase(jsonData);
        // Add more cases for different formats if needed
        default:
          throw new Error('Unsupported format.');
      }
    } catch (error) {
      // Handle errors and provide meaningful messages
      console.error('Error converting JSON data:', error);
      return null;
    }
  }

  /**
   * Converts JSON object keys to camelCase.
   * @param obj The JSON object to convert.
   * @returns The JSON object with camelCase keys.
   */
  private toCamelCase(obj: JsonData): JsonData {
    const result: JsonData = {};
    for (const [key, value] of Object.entries(obj)) {
      // Convert each key to camelCase
      const camelCaseKey = this.toCamelCaseKey(key);
      // Recursively convert nested objects
      result[camelCaseKey] = this.isJsonObject(value) ? this.toCamelCase(value) : value;
    }
    return result;
  }

  /**
   * Converts a string key to camelCase.
   * @param key The string key to convert.
   * @returns The camelCase string key.
   */
  private toCamelCaseKey(key: string): string {
    return key.replace(/([-_][a-z])/ig, ($1) => {
      return $1.toUpperCase().replace('-', '').replace('_', '');
    });
  }

  /**
   * Checks if the value is a JSON object.
   * @param value The value to check.
   * @returns True if the value is a JSON object, false otherwise.
   */
  private isJsonObject(value: any): value is JsonData {
    return value !== null && typeof value === 'object' && !Array.isArray(value);
  }
}
