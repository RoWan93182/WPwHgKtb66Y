// 代码生成时间: 2025-09-29 03:21:53
 * It follows best practices in TypeScript and Angular for maintainability and extensibility.
 */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

// Interface to define the structure of a model explanation
export interface ModelExplanation {
  featureName: string;
  featureValue: any;
  contribution: number;
  explanation: string;
}

// Service to handle model explanation logic
@Injectable({
  providedIn: 'root'
})
export class ModelExplanationService {

  constructor(private http: HttpClient) {}

  /**
   * Fetches model explanation data from a server.
   *
   * @param modelId ID of the model for which to fetch explanations.
   * @param predictionId ID of the prediction for which to fetch explanations.
   * @returns Observable of an array of ModelExplanation objects.
   */
  getModelExplanation(modelId: string, predictionId: string): Observable<ModelExplanation[]> {
    const url = `/api/models/${modelId}/predictions/${predictionId}/explanation`;
    return this.http.get<ModelExplanation[]>(url).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Private method to handle HTTP errors.
   *
   * @param error The error to handle.
   * @returns Observable that emits a user-friendly error message.
   */
  private handleError(error: any): Observable<never> {
    let errorMessage = 'An error occurred';
    if (error.error instanceof ErrorEvent) {
      // Client-side or network error
      errorMessage = `An error occurred: ${error.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      errorMessage = `Server returned code ${error.status}: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}

// Component to display model explanations
import { Component, OnInit } from '@angular/core';
import { ModelExplanationService } from './model_explanation_service';
import { ModelExplanation } from './model_explanation';

@Component({
  selector: 'app-model-explanation-tool',
  templateUrl: './model_explanation_tool.component.html',
  styleUrls: ['./model_explanation_tool.component.css']
})
export class ModelExplanationToolComponent implements OnInit {

  modelExplanations: ModelExplanation[] = [];

  constructor(private modelExplanationService: ModelExplanationService) {}

  ngOnInit(): void {
    this.fetchModelExplanations();
  }

  /**
   * Fetches model explanations for a given model and prediction.
   */
  fetchModelExplanations(): void {
    const modelId = 'your-model-id';
    const predictionId = 'your-prediction-id';
    this.modelExplanationService.getModelExplanation(modelId, predictionId).subscribe(
      (explanations) => {
        this.modelExplanations = explanations;
      },
      (error) => {
        console.error('Error fetching model explanations:', error);
      }
    );
  }
}
