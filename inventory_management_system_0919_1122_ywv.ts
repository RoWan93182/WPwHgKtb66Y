// 代码生成时间: 2025-09-19 11:22:41
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

// Define the structure of an inventory item
interface InventoryItem {
  id: number;
  name: string;
  quantity: number;
  price: number;
}

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  private baseUrl = 'http://localhost:3000/api/inventories';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  // Get all inventory items
  getItems(): Observable<InventoryItem[]> {
    return this.http.get<InventoryItem[]>(this.baseUrl).pipe(
      catchError(this.handleError<InventoryItem[]>('getItems', []))
    );
  }

  // Add a new inventory item
  addItem(item: InventoryItem): Observable<InventoryItem> {
    return this.http.post<InventoryItem>(this.baseUrl, item, this.httpOptions).pipe(
      catchError(this.handleError<InventoryItem>('postItem', item))
    );
  }

  // Delete an inventory item by id
  deleteItem(id: number): Observable<InventoryItem> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<InventoryItem>(url, this.httpOptions).pipe(
      catchError(this.handleError<InventoryItem>('deleteItem', null))
    );
  }

  // Update an inventory item
  updateItem(item: InventoryItem): Observable<any> {
    const url = `${this.baseUrl}/${item.id}`;
    return this.http.put(url, item, this.httpOptions).pipe(
      catchError(this.handleError<any>('updateItem'))
    );
  }

  // Private method to handle HTTP errors
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      let errorMessage = 'An error occurred';
      if (error.error instanceof ErrorEvent) {
        errorMessage = error.error.message;
      } else {
        errorMessage = `Server returned code ${error.status} with body "\${error.error}"`;
      }
      console.error(errorMessage);
      return throwError(errorMessage);
    };
  }
}

/*
 * Inventory Management Component
 * This component manages the UI for the inventory management system.
 */
import { Component, OnInit } from '@angular/core';
import { InventoryService, InventoryItem } from './inventory_management_system';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-inventory-management',
  templateUrl: './inventory-management.component.html',
  styleUrls: ['./inventory-management.component.css']
})
export class InventoryManagementComponent implements OnInit {
  // Form for adding/editing inventory items
  itemForm: FormGroup;
  items: InventoryItem[] = [];
  submitted = false;

  constructor(
    private inventoryService: InventoryService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.itemForm = this.formBuilder.group({
      name: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.min(1)]],
      price: ['', [Validators.required, Validators.min(0)]]
    });
    this.loadItems();
  }

  // Load all inventory items from the service
  loadItems() {
    this.inventoryService.getItems().subscribe({
      next: (items) => {
        this.items = items;
      },
      error: (error) => {
        console.error('Error loading inventory items:', error);
      }
    });
  }

  // Add or update an inventory item
  saveItem() {
    if (this.itemForm.valid) {
      const item = this.itemForm.value;
      this.submitted = true;
      if (item.id) {
        this.updateItem(item);
      } else {
        this.addItem(item);
      }
    } else {
      this.itemForm.markAllAsTouched();
    }
  }

  // Add a new inventory item
  addItem(item: InventoryItem) {
    this.inventoryService.addItem(item).subscribe({
      next: (addedItem) => {
        this.items.push(addedItem);
        this.itemForm.reset();
      },
      error: (error) => {
        console.error('Error adding inventory item:', error);
      }
    });
  }

  // Update an existing inventory item
  updateItem(item: InventoryItem) {
    this.inventoryService.updateItem(item).subscribe({
      next: () => {
        const index = this.items.findIndex(i => i.id === item.id);
        if (index !== -1) {
          this.items[index] = item;
        }
        this.itemForm.reset();
      },
      error: (error) => {
        console.error('Error updating inventory item:', error);
      }
    });
  }

  // Handle form submission
  onSubmit() {
    this.saveItem();
  }

  // Delete an inventory item
  deleteItem(id: number) {
    this.inventoryService.deleteItem(id).subscribe({
      next: () => {
        const index = this.items.findIndex(i => i.id === id);
        if (index !== -1) {
          this.items.splice(index, 1);
        }
      },
      error: (error) => {
        console.error('Error deleting inventory item:', error);
      }
    });
  }
}
