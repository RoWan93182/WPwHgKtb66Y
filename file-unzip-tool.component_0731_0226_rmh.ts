// 代码生成时间: 2025-07-31 02:26:37
 * It provides a simple interface to select files and extract them.
 * This component uses the Angular framework and follows TypeScript best practices.
 */
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { finalize } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import * as JSZip from 'jszip';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-file-unzip-tool',
  templateUrl: './file-unzip-tool.component.html',
  styleUrls: ['./file-unzip-tool.component.css']
})
export class FileUnzipToolComponent {
  // State to hold the selected file
  selectedFile: File | null = null;
  
  // State to hold the extraction progress
  extractionProgress: number = 0;

  constructor(private httpClient: HttpClient, private sanitizer: DomSanitizer) {}

  // Method to handle file selection from input
  handleFileSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  // Method to extract the selected file
  extract(): void {
    if (!this.selectedFile) {
      console.error('No file selected for extraction.');
      return;
    }
    
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      const content = e.target.result as ArrayBuffer;
      // Use JSZip to extract the file content
      JSZip.loadAsync(content).then(zip => {
        zip.forEach((relativePath, zipEntry) => {
          zipEntry.async('blob').then(blob => {
            saveAs(blob, zipEntry.name); // Use file-saver to save the file
          }).catch(error => {
            console.error('Error extracting file:', error);
          });
        }).then(() => {
          console.log('All files have been extracted.');
        }).catch(error => {
          console.error('Error extracting zip:', error);
        });
      }).catch(error => {
        console.error('Error loading zip:', error);
      });
    };
    
    fileReader.onerror = () => {
      console.error('Error reading file:', fileReader.error);
    };
    
    fileReader.readAsArrayBuffer(this.selectedFile);
  }

  // Method to get the extraction progress
  getExtractionProgress(): void {
    // Placeholder for actual progress tracking logic
    // This should be implemented based on the actual extraction process
    console.log('Extraction progress:', this.extractionProgress);
  }
}
