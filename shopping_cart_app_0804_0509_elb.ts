// 代码生成时间: 2025-08-04 05:09:15
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

// Define the Product model
interface Product {
  id: number;
  name: string;
  price: number;
  inStock: boolean;
}

// Define the CartItem model
interface CartItem {
  product: Product;
  quantity: number;
}

// Define the CartService service
@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: CartItem[] = [];
  private apiUrl = '/api/products'; // Define the API endpoint

  constructor(private http: HttpClient) {} // Inject HttpClient

  // Add a product to the cart
  addToCart(product: Product, quantity: number): void {
    if (!product.inStock) {
      throw new Error('Product is not in stock');
    }
    const cartItem = this.cartItems.find(item => item.product.id === product.id);
    if (cartItem) {
      cartItem.quantity += quantity;
    } else {
      this.cartItems.push({ product, quantity });
    }
  }

  // Remove a product from the cart
  removeFromCart(productId: number): void {
    this.cartItems = this.cartItems.filter(item => item.product.id !== productId);
  }

  // Get all items in the cart
  getCart(): CartItem[] {
    return this.cartItems;
  }

  // Get the total price of items in the cart
  getTotalPrice(): number {
    return this.cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
  }

  // Clear the cart
  clearCart(): void {
    this.cartItems = [];
  }
}

// Define the ShoppingCartComponent component
import { Component, OnInit } from '@angular/core';
import { CartService } from './cart.service'; // Import CartService

@Component({
  selector: 'app-shopping-cart',
  template: `<h2>Shopping Cart</h2>
  <div *ngFor="let item of cartItems">{{item.product.name}} - {{item.quantity}} x ${"$"}{{item.product.price}}
  <button (click)="removeFromCart(item.product.id)">Remove</button>
  </div>
  <p>Total: ${"$"}{{totalPrice}}</p>
  <button (click)="clearCart">Clear Cart</button>`,
})
export class ShoppingCartComponent implements OnInit {
  cartItems: CartItem[] = [];
  totalPrice: number = 0;

  constructor(private cartService: CartService) {} // Inject CartService

  ngOnInit(): void {
    this.loadCart();
  }

  // Load cart items from the service
  loadCart(): void {
    try {
      this.cartItems = this.cartService.getCart();
      this.totalPrice = this.cartService.getTotalPrice();
    } catch (error) {
      console.error('Error loading cart:', error);
    }
  }

  // Remove a product from the cart
  removeFromCart(productId: number): void {
    this.cartService.removeFromCart(productId);
    this.loadCart();
  }

  // Clear the cart
  clearCart(): void {
    this.cartService.clearCart();
    this.loadCart();
  }
}
