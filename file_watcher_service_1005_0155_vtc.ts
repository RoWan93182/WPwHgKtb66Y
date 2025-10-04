// 代码生成时间: 2025-10-05 01:55:22
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { distinctUntilChanged, filter, map } from 'rxjs/operators';
import * as fs from 'fs';
import { watch } from 'fs/promises';

// Service for monitoring file changes
@Injectable({
  providedIn: 'root'
})
export class FileWatcherService {
  // Subject to emit file change events
  private fileChangeSubject = new Subject<string>();
  fileChange$ = this.fileChangeSubject.asObservable();

  // Method to start watching a file
  watchFile(path: string): void {
    try {
      // Watch for file changes
      const watcher = watch(path, {
        persistent: true,
        recursive: false
      });

      // Subscribe to the watcher events
      watcher
        .on('change', (eventType: string, filename: string) => {
          // Emit the file change event
          this.fileChangeSubject.next(`File ${filename} has changed.`);
        })
        .on('error', (error: NodeJS.ErrnoException) => {
          // Emit the error
          this.fileChangeSubject.next(`An error occurred: ${error.message}`);
        });
    } catch (error) {
      // Handle any errors that occur during the watching process
      console.error('Failed to watch file:', error);
      this.fileChangeSubject.error(error);
    }
  }

  // Method to stop watching a file
  stopWatchingFile(): void {
    // This method would stop the watcher, but in this example,
    // we have not implemented a way to keep track of the watcher instances.
    // In a real application, you would need to implement a way to manage
    // watcher instances and be able to stop them when needed.
    console.warn('stopWatchingFile() is not implemented yet.');
  }
}

// Example usage:
// const fileWatcher = new FileWatcherService();
// fileWatcher.watchFile('path/to/your/file.txt');
// fileWatcher.fileChange$
//   .pipe(
//     filter((event): event is string => typeof event === 'string'),
//     map((event) => event),
//     distinctUntilChanged(),
//   )
//   .subscribe((changeEvent) => {
//     console.log(changeEvent);
//   });