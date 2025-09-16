// 代码生成时间: 2025-09-16 13:48:32
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import * as fs from 'fs';
import * as path from 'path';

@Injectable({
  providedIn: 'root'
})
export class BackupSyncTool {
  constructor(private http: HttpClient) {}

  /**
   * Backups a file by creating a copy at a specified path.
   *
   * @param sourcePath The path of the file to backup.
   * @param backupPath The path where the backup will be stored.
   *
   * @returns An Observable that emits the result of the backup operation.
   */
  backupFile(sourcePath: string, backupPath: string): Observable<any> {
    return new Observable(observer => {
      fs.copyFile(sourcePath, backupPath, (err) => {
        if (err) {
          observer.error('Backup failed: ' + err.message);
        } else {
          observer.next('Backup successful');
          observer.complete();
        }
      });
    }).pipe(
      catchError(error => {
        return of({ error: error });
      }),
    );
  }

  /**
   * Synchronizes files between two directories by comparing and copying.
   *
   * @param sourceDir The source directory path.
   * @param targetDir The target directory path.
   *
   * @returns An Observable that emits the result of the synchronization operation.
   */
  syncDirectories(sourceDir: string, targetDir: string): Observable<any> {
    return new Observable(observer => {
      fs.readdir(sourceDir, { withFileTypes: true }, (err, dirents) => {
        if (err) {
          observer.error('Sync failed: ' + err.message);
          return;
        }

        // Compare and copy files
        dirents.forEach(dirent => {
          const srcPath = path.join(sourceDir, dirent.name);
          const targetPath = path.join(targetDir, dirent.name);

          if (dirent.isDirectory()) {
            this.syncDirectories(srcPath, targetPath).subscribe({
              next: result => observer.next(result),
              error: error => observer.error(error),
            });
          } else {
            fs.copyFile(srcPath, targetPath, (err) => {
              if (err) {
                observer.error('Sync failed for file ' + dirent.name + ': ' + err.message);
              } else {
                observer.next('Sync successful for file ' + dirent.name);
              }
            });
          }
        });

        observer.complete();
      });
    }).pipe(
      catchError(error => {
        return of({ error: error });
      }),
    );
  }

  /**
   * Checks if a file exists at the given path.
   *
   * @param filePath The path to check.
   *
   * @returns A Promise that resolves with a boolean indicating the existence of the file.
   */
  fileExists(filePath: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
          resolve(false);
        } else {
          resolve(true);
        }
      });
    });
  }
}
