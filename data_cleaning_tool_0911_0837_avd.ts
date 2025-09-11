// 代码生成时间: 2025-09-11 08:37:54
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataCleaningTool {
  constructor() {}

  /**
   * Cleans the input data by trimming spaces and converting to lower case.
   *
   * @param data The input data to be cleaned.
   * @returns A cleaned version of the input data.
   * @throws Error if the input data is not a string.
   */
  public cleanData(data: any): string {
    if (typeof data !== 'string') {
      throw new Error('Input data must be a string.');
    }

    return data
      .trim()
      .toLowerCase();
  }

  /**
   * Preprocesses the cleaned data by replacing or removing unwanted characters.
   *
   * @param cleanedData The cleaned data to be preprocessed.
   * @param replacements An object containing characters to replace or remove.
   * @returns The preprocessed data.
   */
  public preprocessData(cleanedData: string, replacements: { [key: string]: string | null }): string {
    for (const [char, replacement] of Object.entries(replacements)) {
      if (replacement === null) {
        cleanedData = cleanedData.replace(char, '');
      } else {
        cleanedData = cleanedData.replace(char, replacement);
      }
    }

    return cleanedData;
  }

  /**
   * Validates the data against a set of rules.
   *
   * @param data The data to be validated.
   * @param validationRules An array of validation functions.
   * @returns A boolean indicating whether the data passes all validation rules.
   */
  public validateData(data: any, validationRules: Array<(data: any) => boolean>): boolean {
    for (const rule of validationRules) {
      if (!rule(data)) {
        return false;
      }
    }
    return true;
  }
}

/*
 * Examples of usage:
 *
 * const tool = new DataCleaningTool();
 *
 * try {
 *   const cleaned = tool.cleanData(' Some data with spaces and mixed CASE ');
 *   const preprocessed = tool.preprocessData(cleaned, {
 *     '!': null,
 *     '@': 'at'
 *   });
 *   console.log(preprocessed);
 * } catch (error) {
 *   console.error(error);
 * }
 *
 * const isValid = tool.validateData(cleaned, [
 *   data => data.length > 0,
 *   data => typeof data === 'string'
 * ]);
 * console.log(isValid);
 */