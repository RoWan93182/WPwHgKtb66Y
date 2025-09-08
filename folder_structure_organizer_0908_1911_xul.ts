// 代码生成时间: 2025-09-08 19:11:06
import { Injectable } from '@angular/core';
import * as fs from 'fs';
import * as path from 'path';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FolderStructureOrganizerService {

  constructor() {}

  /**
   * Recursively organizes the directory structure by sorting files and folders.
   * @param dirPath The path to the directory to organize.
   * @returns An Observable emitting the organized directory structure.
   */
  organizeDirectory(dirPath: string): Observable<string[]> {
    return new Observable((observer) => {
      fs.readdir(dirPath, { withFileTypes: true }, (err, files) => {
        if (err) {
          observer.error(`Error reading directory: ${err.message}`);
          return;
        }

        // Separate files and directories
        const filesArray = Array.from(files).filter(file => file.isFile());
        const dirsArray = Array.from(files).filter(file => file.isDirectory());

        // Sort files and directories
        filesArray.sort();
        dirsArray.sort();

        // Recursively organize subdirectories
        const sortedDirs = dirsArray.map(dir => {
          return this.organizeDirectory(path.join(dirPath, dir.name)).pipe(
            catchError(error => {
              observer.error(error);
              return throwError(error);
            })
          );
        });

        // Flatten the sorted directories and files into a single array
        const organizedStructure = [].concat(...sortedDirs, filesArray.map(file => file.name));

        observer.next(organizedStructure);
        observer.complete();
      });
    }).pipe(
      catchError(error => {
        return throwError(error);
      })
    );
  }
}
