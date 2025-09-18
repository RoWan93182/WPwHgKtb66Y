// 代码生成时间: 2025-09-18 10:00:57
import { Injectable } from '@angular/core';
import * as fs from 'fs';
import * as path from 'path';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BulkRenameTool {
  
  /**
   * Rename multiple files in a directory.
   * @param directoryPath Path to the directory containing files to rename.
   * @param renameFunction A function that takes a filename and returns the new filename.
   * @returns An observable that emits renamed filenames.
   */
  renameFiles(directoryPath: string, renameFunction: (filename: string) => string): Observable<string> {
    return new Observable(observer => {
      try {
        // Read all files in the directory recursively
        const files = fs.readdirSync(directoryPath, { withFileTypes: true });

        files.forEach(file => {
          if (file.isFile()) {
            const oldPath = path.join(directoryPath, file.name);
            const newPath = path.join(directoryPath, renameFunction(file.name));
            fs.renameSync(oldPath, newPath);
            observer.next(file.name);
          }
        });

        observer.complete();
      } catch (error) {
        observer.error(error);
      }
    });
  }

  /**
   * Generate a new filename by appending a counter to the original filename.
   * @param filename Original filename.
   * @param counter Counter value to append.
   * @returns The new filename with the counter appended.
   */
  private generateNewFilename(filename: string, counter: number): string {
    const extension = path.extname(filename);
    const nameWithoutExtension = path.basename(filename, extension);
    return `${nameWithoutExtension}_${counter}${extension}`;
  }
}

/**
 * @module BulkRenameToolService
 * @description Service for handling bulk rename operations.
 */

import { Injectable } from '@angular/core';
import { BulkRenameTool } from './bulk_rename_tool';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BulkRenameToolService {
  private counter = 0;
  private directoryPath: string;
  private renameFunction: (filename: string) => string;

  constructor(private bulkRenameTool: BulkRenameTool) {}

  /**
   * Set the directory path for the rename operation.
   * @param directoryPath Path to the directory.
   */
  setDirectoryPath(directoryPath: string): void {
    this.directoryPath = directoryPath;
  }

  /**
   * Set the rename function for the operation.
   * @param renameFunction A function that generates the new filename.
   */
  setRenameFunction(renameFunction: (filename: string) => string): void {
    this.renameFunction = renameFunction;
  }

  /**
   * Execute the bulk rename operation.
   * @returns An observable that emits the renamed filenames.
   */
  executeRenameOperation(): Observable<string> {
    return of(this.directoryPath).pipe(
      switchMap((directoryPath) => this.bulkRenameTool.renameFiles(directoryPath, this.renameFunction))
    );
  }
}

/**
 * @module BulkRenameToolComponent
 * @description Angular component for the bulk rename tool.
 */

import { Component } from '@angular/core';
import { BulkRenameToolService } from './bulk_rename_tool_service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-bulk-rename-tool',
  templateUrl: './bulk_rename_tool.component.html',
  styleUrls: ['./bulk_rename_tool.component.css']
})
export class BulkRenameToolComponent {
  directoryPathForm: FormGroup;
  renameOperationForm: FormGroup;
  renamingInProgress = false;

  constructor(
    private bulkRenameToolService: BulkRenameToolService,
    private fb: FormBuilder
  ) {
    this.directoryPathForm = this.fb.group({
      directoryPath: ['', Validators.required]
    });

    this.renameOperationForm = this.fb.group({
      startCounter: [1, Validators.required]
    });
  }

  /**
   * Handle the directory path form submission.
   * Set the directory path for the rename operation.
   */
  onDirectoryPathSubmit(): void {
    this.bulkRenameToolService.setDirectoryPath(this.directoryPathForm.value.directoryPath);
  }

  /**
   * Handle the rename operation form submission.
   * Execute the bulk rename operation.
   */
  onRenameOperationSubmit(): void {
    this.renamingInProgress = true;
    this.bulkRenameToolService.setRenameFunction(filename => {
      const counter = this.renameOperationForm.value.startCounter;
      return this.bulkRenameToolService.bulkRenameTool.generateNewFilename(filename, counter);
    });
    this.bulkRenameToolService.executeRenameOperation().pipe(
      finalize(() => this.renamingInProgress = false)
    ).subscribe(
      (renamedFilename) => console.log(`Renamed: ${renamedFilename}`),
      (error) => console.error(`Error: ${error.message}`)
    );
  }
}
