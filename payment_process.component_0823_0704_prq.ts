// 代码生成时间: 2025-08-23 07:04:18
import { Component, OnInit } from '@angular/core';
import { PaymentService } from './payment.service'; // Import the PaymentService
import { PaymentInfo } from './models/payment-info.model'; // Import the PaymentInfo model

@Component({
  selector: 'app-payment-process',
  templateUrl: './payment-process.component.html',
  styleUrls: ['./payment-process.component.css']
})
export class PaymentProcessComponent implements OnInit {
  
  // Payment information object
  paymentInfo: PaymentInfo;
  paymentError: string; // To store any error message
  
  constructor(private paymentService: PaymentService) {
    this.paymentInfo = {
      amount: 0,
      currency: 'USD',
      paymentMethod: 'Credit Card'
    };
  }
  
  // Lifecycle hook to initialize the component
  ngOnInit(): void {
  }
  
  // Method to process the payment
  processPayment(): void {
    if (!this.validatePaymentInfo()) {
      this.paymentError = 'Please enter valid payment details.';
      return;
    }
    try {
      // Call the payment service to process the payment
      const result = this.paymentService.process(this.paymentInfo);
      
      if (result.success) {
        // Handle successful payment
        console.log('Payment successful:', result.message);
      } else {
        // Handle unsuccessful payment
        console.error('Payment failed:', result.message);
      }
    } catch (error) {
      // Handle any exceptions
      console.error('Error processing payment:', error);
      this.paymentError = 'Failed to process payment. Please try again.';
    }
  }
  
  // Method to validate payment information
  validatePaymentInfo(): boolean {
    // Add validation logic here
    // For example:
    if (this.paymentInfo.amount <= 0) {
      return false;
    }
    // More validation conditions can be added as needed
    return true;
  }
}
