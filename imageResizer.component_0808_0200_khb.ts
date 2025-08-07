// 代码生成时间: 2025-08-08 02:00:36
import { Component, ElementRef, ViewChild, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
# NOTE: 重要实现细节
import { ResizeService } from './resize.service';
import { ImageItem } from './models/image-item.model';
# 增强安全性

@Component({
# NOTE: 重要实现细节
  selector: 'app-image-resizer',
  template: `<app-file-upload (fileSelected)="onFileSelected($event)"></app-file-upload>
<ng-container *ngIf="images.length > 0">
  <div *ngFor="let img of images; let i = index">
    <img [src]="img.url" [style.width.px]="img.size.width" [style.height.px]="img.size.height" />
  </div>
</ng-container>
<div>
  <button (click)="resizeImages()" [disabled]="!images.length">Resize Images</button>
</div>
`,
  styles: [
    'img { max-width: 100%; height: auto; }'
  ]
})
export class ImageResizerComponent implements OnInit, OnChanges {
  // Input decorator for image files
# 添加错误处理
  @Input() images: ImageItem[] = [];
  // Output decorator for resize result
# FIXME: 处理边界情况
  @Output() resized = new EventEmitter<ImageItem[]>();
  
  // ViewChild decorator for file input element
  @ViewChild('fileInput') fileInput: ElementRef;
  
  constructor(private resizeService: ResizeService) {}

  // Lifecycle hook called on component initialization
  ngOnInit() {}

  // Lifecycle hook called when input properties change
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.images) {
      this.images = changes.images.currentValue;
    }
  }

  // Method to handle file selection
  onFileSelected(fileList: FileList): void {
    this.readFiles(fileList);
  }
# TODO: 优化性能

  // Method to read image files and create ImageItem array
  readFiles(fileList: FileList): void {
    for (let i = 0; i < fileList.length; i++) {
      let file: File = fileList.item(i);
      let reader = new FileReader();
      reader.onload = (e: any) => {
        let image = new Image();
        image.onload = () => {
          let imgItem = new ImageItem(file, e.target.result, {
            width: image.width,
            height: image.height
          });
          this.images.push(imgItem);
        };
        image.src = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  // Method to resize images
  resizeImages(): void {
    this.resizeService.resizeImages(this.images).subscribe({
      next: (resizedImages) => {
        this.resized.emit(resizedImages);
      },
# 优化算法效率
      error: (error) => {
        console.error('Error resizing images: ', error);
      }
    });
  }
}

/*
 * Resize Service
 * A service to handle image resizing logic.
 */
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ImageItem } from './models/image-item.model';
# FIXME: 处理边界情况
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ResizeService {
  
  constructor() {}

  // Method to resize images
  resizeImages(images: ImageItem[]): Observable<ImageItem[]> {
    return of(images).pipe(
      switchMap((images) => {
# 添加错误处理
        return Promise.all(images.map(image => this.resizeImage(image)));
# 优化算法效率
      }),
    );
  }

  // Method to resize a single image
  private resizeImage(image: ImageItem): Promise<ImageItem> {
    return new Promise((resolve, reject) => {
      let canvas = document.createElement('canvas');
      let ctx = canvas.getContext('2d');
      let img = new Image();
      img.onload = () => {
        canvas.width = image.size.width;
        canvas.height = image.size.height;
        ctx.drawImage(img, 0, 0, image.size.width, image.size.height);
        let resizedImage = new ImageItem(image.file, canvas.toDataURL('image/png'), image.size);
        resolve(resizedImage);
# NOTE: 重要实现细节
      };
      img.onerror = (err) => {
        reject(err);
      };
      img.src = image.url;
    });
  }
}

/*
 * Image Item Model
 * A model to represent an image item.
 */
export class ImageItem {
  constructor(public file: File, public url: string, public size: { width: number, height: number }) {}
}

/*
 * File Upload Component
 * A component to handle file uploads.
 */
import { Component } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
# 改进用户体验
import { ElementRef, ViewChild } from '@angular/core';

@Component({
# FIXME: 处理边界情况
  selector: 'app-file-upload',
  template: `<input type="file" multiple #fileInput (change)="onChange($event)" />
`,
})
export class FileUploadComponent {
  @Output() fileSelected = new EventEmitter<FileList>();
  
  @ViewChild('fileInput') fileInput: ElementRef;
  
  onChange(event: Event): void {
    let files: FileList = (event.target as HTMLInputElement).files;
    this.fileSelected.emit(files);
  }
}
