// 代码生成时间: 2025-09-04 20:17:01
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

// InventoryItem represents an item in the inventory.
export interface InventoryItem {
  id: number;
  name: string;
  quantity: number;
}

// InventoryService handles all inventory-related data operations.
@Injectable({
  providedIn: 'root',
})
export class InventoryService {
  private baseUrl = 'http://api.example.com/inventory';  // URL to the inventory API.

  constructor(private http: HttpClient) {}

  // Gets all inventory items from the API.
  getAllItems(): Observable<InventoryItem[]> {
    return this.http.get<InventoryItem[]>(this.baseUrl).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  // Adds a new item to the inventory.
  addItem(item: InventoryItem): Observable<InventoryItem> {
    return this.http.post<InventoryItem>(this.baseUrl, item).pipe(
      catchError(this.handleError)
    );
  }

  // Updates an existing item in the inventory.
  updateItem(item: InventoryItem): Observable<InventoryItem> {
    return this.http.put<InventoryItem>(`${this.baseUrl}/${item.id}`, item).pipe(
      catchError(this.handleError)
    );
  }

  // Deletes an item from the inventory.
  deleteItem(itemId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${itemId}`).pipe(
      catchError(this.handleError)
    );
  }

  // Handle HTTP errors.
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`
      );
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.'
    );
  }
}

// InventoryComponent is responsible for rendering the inventory items.
import { Component, OnInit } from '@angular/core';
import { InventoryItem } from './inventory-item';
import { InventoryService } from './inventory-service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css'],
})
export class InventoryComponent implements OnInit {
  items: InventoryItem[] = [];
  loading: boolean = false;
  error: string = '';

  constructor(private inventoryService: InventoryService) {}

  ngOnInit(): void {
    this.loadItems();
  }

  // Loads all inventory items.
  loadItems(): void {
    this.loading = true;
    this.inventoryService.getAllItems().subscribe({
      next: (data) => {
        this.items = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = err;
        this.loading = false;
     }
    });
  }

  // Adds a new item to the inventory.
  addItem(item: InventoryItem): void {
    this.inventoryService.addItem(item).subscribe({
      next: (newItem) => {
        this.items.push(newItem);
        this.error = '';
      },
      error: (err) => {
        this.error = err;
     }
    });
  }

  // Updates an existing item in the inventory.
  updateItem(item: InventoryItem): void {
    this.inventoryService.updateItem(item).subscribe({
      next: (updatedItem) => {
        const index = this.items.findIndex(i => i.id === updatedItem.id);
        this.items[index] = updatedItem;
        this.error = '';
      },
      error: (err) => {
        this.error = err;
     }
    });
  }

  // Deletes an item from the inventory.
  deleteItem(itemId: number): void {
    this.inventoryService.deleteItem(itemId).subscribe({
      next: () => {
        this.items = this.items.filter(item => item.id !== itemId);
        this.error = '';
      },
      error: (err) => {
        this.error = err;
     }
    });
  }
}
