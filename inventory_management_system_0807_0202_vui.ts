// 代码生成时间: 2025-08-07 02:02:03
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

// Interface for inventory items
export interface InventoryItem {
  id: number;
  name: string;
  quantity: number;
  price: number;
}

// Service for inventory management
@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  private baseUrl = 'http://api.example.com/inventory';

  constructor(private http: HttpClient) {}

  // Get all inventory items
  getAllItems(): Observable<InventoryItem[]> {
    return this.http.get<InventoryItem[]>(this.baseUrl).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  // Get inventory item by ID
  getItemById(id: number): Observable<InventoryItem> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<InventoryItem>(url).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  // Add a new inventory item
  addNewItem(item: InventoryItem): Observable<InventoryItem> {
    return this.http.post<InventoryItem>(this.baseUrl, item).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  // Update an existing inventory item
  updateItem(item: InventoryItem): Observable<InventoryItem> {
    const url = `${this.baseUrl}/${item.id}`;
    return this.http.put<InventoryItem>(url, item).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  // Delete an inventory item
  deleteItem(id: number): Observable<any> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete(url).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  // Private method to handle HTTP errors
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Client-side or network error
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`
      );
    }
    // Return an observable with a user-friendly error message
    return throwError(
      'Something bad happened; please try again later.'
    );
  }
}

/*
 * Inventory Management Component
 *
 * This component displays the inventory list and handles user interactions.
 */
import { Component, OnInit } from '@angular/core';
import { InventoryService, InventoryItem } from './inventory_service';

@Component({
  selector: 'app-inventory-management',
  templateUrl: './inventory_management.component.html',
  styleUrls: ['./inventory_management.component.css']
})
export class InventoryManagementComponent implements OnInit {
  items: InventoryItem[] = [];
  item: InventoryItem | undefined;
  error: string | undefined;

  constructor(private inventoryService: InventoryService) {}

  ngOnInit(): void {
    this.getItems();
  }

  getItems(): void {
    this.inventoryService.getAllItems().subscribe(
      data => this.items = data,
      error => this.error = error.message
    );
  }

  getItemById(id: number): void {
    this.inventoryService.getItemById(id).subscribe(
      data => this.item = data,
      error => this.error = error.message
    );
  }

  addItem(item: InventoryItem): void {
    this.inventoryService.addNewItem(item).subscribe(
      data => { this.items.push(data); this.item = undefined; },
      error => this.error = error.message
    );
  }

  updateItem(item: InventoryItem): void {
    this.inventoryService.updateItem(item).subscribe(
      data => {
        const index = this.items.findIndex(i => i.id === data.id);
        if (index !== -1) { this.items[index] = data; }
        this.item = undefined;
      },
      error => this.error = error.message
    );
  }

  deleteItem(id: number): void {
    this.inventoryService.deleteItem(id).subscribe(
      () => { this.items = this.items.filter(i => i.id !== id); },
      error => this.error = error.message
    );
  }
}
