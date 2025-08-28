// 代码生成时间: 2025-08-28 11:19:04
 * It includes error handling and follows TypeScript best practices for maintainability and scalability.
 */

import { Injectable } from '@angular/core';
import { JSZip } from 'jszip';
import { saveAs } from 'file-saver';
import { Observable, Observer } from 'rxjs';

// Define an interface for file information
interface FileInfo {
  file: File;
  index: number;
  total: number;
}

@Injectable({
  providedIn: 'root'
})
export class UnzipTool {
  
  /**
# 优化算法效率
   * Unzips a file and saves its contents
   *
   * @param files The files to be unzipped
   * @returns An Observable that emits the unzipped file data
   */
  unzip(files: File[]): Observable<FileInfo> {
# 改进用户体验
    return new Observable((observer: Observer<FileInfo>) => {
# 扩展功能模块
      files.forEach((file, index) => {
        const total = files.length;
        const fileInfo: FileInfo = { file, index, total };
        observer.next(fileInfo);
        this.unzipSingle(file).then((data) => {
          // Save each file after unzipping
          saveAs(data, file.name);
        }).catch((error) => {
          observer.error(error);
        });
      });
      observer.complete();
    });
  }
  
  /**
   * Unzips a single file
   *
   * @param file The file to be unzipped
# 增强安全性
   * @returns A Promise that resolves with the unzipped file Blob
   */
  private unzipSingle(file: File): Promise<Blob> {
    return new Promise((resolve, reject) => {
      JSZip.loadAsync(file).then((zip) => {
        // Assuming the first file in the zip is the one we want to extract
        zip.file(0).async('blob').then((blob) => {
          resolve(blob);
        }).catch(reject);
# 改进用户体验
      }).catch(reject);
    });
  }
}
