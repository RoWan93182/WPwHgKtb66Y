// 代码生成时间: 2025-10-04 15:52:42
 * and calculate potential returns.
 */
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-wealth-management',
  templateUrl: './wealth-management.component.html',
  styleUrls: ['./wealth-management.component.css']
})
export class WealthManagementComponent implements OnInit {
  // Input model for investment details
  investmentDetails: InvestmentDetails = {
    principal: null,
    interestRate: null,
    years: null,
  };

  // Output model for calculated returns
  calculatedReturns: CalculatedReturns = {
    totalAmount: null,
    interestEarned: null,
  };

  // Error message for invalid input
  errorMessage: string = '';

  // Calculates the compound interest
  calculateCompoundInterest(): void {
    const principal = parseFloat(this.investmentDetails.principal);
    const interestRate = parseFloat(this.investmentDetails.interestRate) / 100;
    const years = parseInt(this.investmentDetails.years, 10);

    if (isNaN(principal) || isNaN(interestRate) || isNaN(years)) {
      this.errorMessage = 'Please enter valid numbers for principal, interest rate, and years.';
      return;
    }

    const totalAmount = principal * Math.pow(1 + interestRate, years);
    const interestEarned = totalAmount - principal;

    this.calculatedReturns.totalAmount = totalAmount.toFixed(2);
    this.calculatedReturns.interestEarned = interestEarned.toFixed(2);
  }

  ngOnInit(): void {
    // Initialize component
  }
}

/*
 * InvestmentDetails: Interface to define the structure of investment details.
 */
interface InvestmentDetails {
  principal: string;
  interestRate: string;
  years: string;
}

/*
 * CalculatedReturns: Interface to define the structure of calculated returns.
 */
interface CalculatedReturns {
  totalAmount: string;
  interestEarned: string;
}