// 代码生成时间: 2025-09-03 22:06:39
import { Injectable } from '@angular/core';
import { File } from '@angular/material-mime-types';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BulkRenameUtilityService {
  constructor(private http: HttpClient) {}

  private baseUrl = 'http://localhost:3000/api/rename';

  /**
   * Renames a list of files using the rename endpoint.
   * @param files List of files to rename.
   * @param newName The new name for the files.
   * @returns An observable of the rename result.
   */
  renameFiles(files: File[], newName: string): any {
    if (!files || !files.length) {
      return of({
        error: 'No files provided.'
      });
    }
    
    const renamedFiles = files.map(file => {
      return {
        ...file,
        name: this.generateNewName(file.name, newName)
      };
    });
    
    return this.http.post<any>(this.baseUrl, renamedFiles).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Generates a new name for the file based on the provided prefix.
   * @param originalName The original name of the file.
   * @param newName The new name to be added.
   * @returns The new name for the file.
   */
  private generateNewName(originalName: string, newName: string): string {
    const extension = originalName.split('.').pop();
    return `${newName}.${extension}`;
  }

  /**
   * Handles errors for the HTTP requests.
   * @param error The error object.
   * @returns An observable of the error.
   */
  private handleError(error: any) {
    return of({ error: error.message });
  }
}

/*
 * Component for the Bulk Rename Utility.
 */
import { Component, OnInit } from '@angular/core';
import { BulkRenameUtilityService } from './bulk_rename_utility.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-bulk-rename-utility',
  templateUrl: './bulk_rename_utility.component.html',
  styleUrls: ['./bulk_rename_utility.component.css']
})
export class BulkRenameUtilityComponent implements OnInit {
  renameForm: FormGroup;
  files: File[] = [];
  renamedFiles: any[] = [];
  error: any;

  constructor(private renameService: BulkRenameUtilityService, private fb: FormBuilder) {}

  ngOnInit() {
    this.renameForm = this.fb.group({
      newName: ['', Validators.required]
    });
  }

  /**
   * Handles the file input change event.
   * @param event The file input change event.
   */
  onFileChange(event: Event) {
    const files = (event.target as HTMLInputElement).files;
    if (files) {
      this.files = Array.from(files);
    }
  }

  /**
   * Submits the rename form and renames the files.
   * @param form The form value.
   */
  onSubmit() {
    if (this.renameForm.valid) {
      this.renameService.renameFiles(this.files, this.renameForm.value.newName).subscribe({
        next: (response) => {
          this.renamedFiles = response;
        },
        error: (err) => {
          this.error = err.error;
        }
      });
    } else {
      this.error = 'Please fill in the required fields.';
    }
  }
}