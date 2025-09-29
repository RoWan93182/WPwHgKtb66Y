// 代码生成时间: 2025-09-29 21:17:26
import { Injectable } from '@angular/core';
import { throwError as observableThrowError, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

// Interface to define the structure of an AdCampaign
export interface AdCampaign {
  id: number;
  name: string;
  startDate: Date;
  endDate: Date;
  budget: number;
  active: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AdCampaignService {

  private baseUrl: string = 'https://api.adsystem.com/campaigns';

  constructor() { }

  /**
   * Retrieves a list of ad campaigns from the server.
   *
   * @returns Observable<AdCampaign[]>
   */
  getAdCampaigns(): Observable<AdCampaign[]> {
    return fetch(this.baseUrl).pipe(
      map(response => response.json() as AdCampaign[]),
      catchError(this.handleError)
    );
  }

  /**
   * Retrieves a single ad campaign by ID from the server.
   *
   * @param id The ID of the ad campaign to retrieve.
   * @returns Observable<AdCampaign>
   */
  getAdCampaignById(id: number): Observable<AdCampaign> {
    const url = `${this.baseUrl}/${id}`;
    return fetch(url).pipe(
      map(response => response.json() as AdCampaign),
      catchError(this.handleError)
    );
  }

  /**
   * Creates a new ad campaign on the server.
   *
   * @param campaign The campaign object to create.
   * @returns Observable<AdCampaign>
   */
  createAdCampaign(campaign: AdCampaign): Observable<AdCampaign> {
    return fetch(this.baseUrl, {
      method: 'POST',
      body: JSON.stringify(campaign),
      headers: { 'Content-Type': 'application/json' }
    }).pipe(
      map(response => response.json() as AdCampaign),
      catchError(this.handleError)
    );
  }

  /**
   * Updates an existing ad campaign on the server.
   *
   * @param campaign The campaign object with updated values.
   * @returns Observable<AdCampaign>
   */
  updateAdCampaign(campaign: AdCampaign): Observable<AdCampaign> {
    const url = `${this.baseUrl}/${campaign.id}`;
    return fetch(url, {
      method: 'PUT',
      body: JSON.stringify(campaign),
      headers: { 'Content-Type': 'application/json' }
    }).pipe(
      map(response => response.json() as AdCampaign),
      catchError(this.handleError)
    );
  }

  /**
   * Deletes an ad campaign from the server.
   *
   * @param id The ID of the campaign to delete.
   * @returns Observable<void>
   */
  deleteAdCampaign(id: number): Observable<void> {
    const url = `${this.baseUrl}/${id}`;
    return fetch(url, {
      method: 'DELETE'
    }).pipe(
      map(() => null),
      catchError(this.handleError)
    );
  }

  /**
   * Handles any errors that occur during HTTP requests.
   *
   * @param error The error caught during an HTTP operation.
   * @returns Observable<never>
   */
  private handleError(error: any) {
    let errorMessage = 'An unknown error occurred';
    if (error.error instanceof ErrorEvent) {
      // Client-side or network error
      errorMessage = `An error occurred: ${error.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      errorMessage = `Server returned code: ${error.status}, error message is: ${error.message}`;
    }
    console.error(errorMessage);
    return observableThrowError(errorMessage);
  }
}
