// 代码生成时间: 2025-09-28 20:24:49
import { Component, ElementRef, ViewChild, AfterViewInit, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { ResizeOptions } from './resize-options.model';
import { ImageService } from './image.service';

@Component({
  selector: 'app-image-resizer',
  templateUrl: './image-resizer.component.html',
  styleUrls: ['./image-resizer.component.css']
})
export class ImageResizerComponent implements OnInit, AfterViewInit {
  @ViewChild('fileInput') fileInput: ElementRef;
  @Input() options: ResizeOptions;
  @Output() resizeComplete = new EventEmitter<void>();
  private images: File[] = [];

  // Constructor
  constructor(private imageService: ImageService) { }

  // Lifecycle hook to get component initialized
  ngOnInit() {
    if (!this.options) {
      throw new Error('Resize options are required.');
    }
  }

  // Lifecycle hook to get component view initialized
  ngAfterViewInit() {
    this.fileInput.nativeElement.addEventListener('change', (event) => {
      this.handleFiles(event.target.files);
    });
  }

  // Handle file input change event
  private handleFiles(files: FileList): void {
    if (files) {
      this.images = Array.from(files);
      this.resizeImages();
    } else {
      console.error('No files were selected.');
    }
  }

  // Resize images with the given options
  private resizeImages(): void {
    this.images.forEach((file) => {
      this.imageService.resizeImage(file, this.options).subscribe({
        next: (resizedFile) => {
          // Handle the resized file
          console.log('Image resized:', resizedFile);
        },
        error: (error) => {
          // Handle error
          console.error('Error resizing image:', error);
        }
      });
    });
  }

  // Public method to trigger the resizing process
  onResize(): void {
    if (this.images.length === 0) {
      console.error('No images to resize.');
      return;
    }
    this.resizeImages();
  }
}

/*
 * ResizeOptions Model
 * Defines the options for resizing an image.
 */
export interface ResizeOptions {
  width: number;
  height: number;
  quality: number;
}

/*
 * ImageService
 * Provides a method to resize images.
 */
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { ResizeOptions } from './resize-options.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  resizeImage(file: File, options: ResizeOptions) {
    // Here you would have the logic to resize an image
    // This is a mock implementation that returns the file as is
    return of(file).pipe(
      map(() => {
        // Resize logic would go here
        console.log('Resizing image with options:', options);
        return file; // Return the resized file
      }),
    );
  }
}