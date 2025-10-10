// 代码生成时间: 2025-10-10 23:08:04
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HealthRiskAssessmentComponent } from './health-risk-assessment.component';
import { HealthRiskService } from './health-risk.service';

// Defines the Health Risk Assessment module and its dependencies
@NgModule({
  declarations: [
    HealthRiskAssessmentComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule
  ],
  providers: [
    HealthRiskService
  ],
  bootstrap: [HealthRiskAssessmentComponent]
})
export class HealthRiskAssessmentModule {}

/*
 * Health Risk Assessment Component
 * This component is responsible for taking user inputs and displaying the risk assessment.
 */
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HealthRiskService } from './health-risk.service';

@Component({
  selector: 'app-health-risk-assessment',
  templateUrl: './health-risk-assessment.component.html',
  styleUrls: ['./health-risk-assessment.component.css']
})
export class HealthRiskAssessmentComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder, private healthRiskService: HealthRiskService) {
    this.form = this.fb.group({
      age: ['', [Validators.required, Validators.min(0)]],
      weight: ['', [Validators.required, Validators.min(0)]],
      height: ['', [Validators.required, Validators.min(0)]],
      lifestyle: ['', Validators.required]
    });
  }

  // Submits the form and processes the health risk assessment
  onSubmit() {
    if (this.form.invalid) {
      return;
    }
    try {
      const riskLevel = this.healthRiskService.calculateRisk(this.form.value);
      console.log(`Your risk level is: ${riskLevel}`);
    } catch (error) {
      console.error('Error calculating risk:', error);
    }
  }
}

/*
 * Health Risk Service
 * This service performs the actual risk calculation based on user input data.
 */
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class HealthRiskService {
  // Calculates the health risk based on provided form data
  calculateRisk(formData: FormGroup): string {
    if (!formData.valid) {
      throw new Error('Invalid form data');
    }
    // Simplified example risk calculation logic
    const age = formData.get('age')!.value;
    const weight = formData.get('weight')!.value;
    const height = formData.get('height')!.value;
    const lifestyle = formData.get('lifestyle')!.value;
    
    // Placeholder logic for risk calculation
    let riskLevel = 'Low';
    if (age > 60) riskLevel = 'High';
    if (weight > 100) riskLevel = 'High';
    if (height < 150) riskLevel = 'High';
    if (lifestyle === 'Unhealthy') riskLevel = 'High';
    
    return riskLevel;
  }
}
