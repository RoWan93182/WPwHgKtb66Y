// 代码生成时间: 2025-09-23 13:37:05
import { Component, ElementRef, ViewChild } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import * as JSZip from 'jszip';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-zip-decompressor',
  template: `
    <div>
      <input #zipFile type="file" (change)="decompressZipFile($event)" />
      <iframe #zipViewer [src]="decompressedUrl" style="width: 100%; height: 500px;" *ngIf="decompressedUrl" />
    </div>
  `,
  styles: []
})
export class ZipDecompressorComponent {
  @ViewChild('zipViewer') zipViewer: ElementRef;
  decompressedUrl: SafeResourceUrl | null;

  constructor(private sanitizer: DomSanitizer) { }

  /**
   * Decompress zip file and display its contents in an iframe.
   * @param event - File input event that contains the zip file.
   */
  decompressZipFile(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) {
      console.error('No file selected.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e: ProgressEvent) => {
      const content = e.target?.result as ArrayBuffer;
      if (!content) {
        console.error('Failed to read zip file.');
        return;
      }

      JSZip.loadAsync(content).then((zip) => {
        const fileNames = Object.keys(zip.files);
        if (fileNames.length === 0) {
          console.error('Zip file is empty.');
          return;
        }

        const htmlFiles = fileNames.filter((fileName) => fileName.endsWith('.html'));
        if (htmlFiles.length === 0) {
          console.error('No HTML files found in the zip.');
          return;
        }

        const firstHtmlContent = zip.file(htmlFiles[0]).asText();
        if (firstHtmlContent) {
          const blob = new Blob([firstHtmlContent], { type: 'text/html' });
          this.decompressedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
            URL.createObjectURL(blob)
          );
        } else {
          console.error('Failed to read HTML content from zip.');
        }
      });
    };
    reader.onerror = () => console.error('Error reading zip file.');
    reader.readAsArrayBuffer(file);
  }

  /**
   * Download the decompressed zip file.
   */
  downloadDecompressedFile(): void {
    if (this.decompressedUrl) {
      const link = document.createElement('a');
      link.href = this.decompressedUrl;
      link.download = 'decompressed.zip';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }
}
