// 代码生成时间: 2025-08-14 19:23:04
import { Injectable } from '@angular/core';
import * as JSZip from 'jszip';
import { saveAs } from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class DecompressionService {
  
  constructor() {
  }

  /**
   * Decompress a file asynchronously.
   * @param file The file blob to decompress.
   */
  async decompressFile(file: Blob): Promise<void> {
    try {
      // Load the file into JSZip
      const zip = await JSZip.loadAsync(file);

      // Extract all files from the zip archive
      zip.forEach((relativePath, zipEntry) => {
        // Extract the file to a Blob
        zipEntry.async('blob').then(file => {
          saveAs(file, zipEntry.name);
        }).catch(error => {
          console.error('Error extracting file:', error);
        });
      });
    } catch (error) {
      console.error('Decompression error:', error);
      throw new Error('Failed to decompress the file.');
    }
  }
}
