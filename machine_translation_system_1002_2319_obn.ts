// 代码生成时间: 2025-10-02 23:19:56
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Component({
  selector: 'app-machine-translation',
  templateUrl: './machine-translation.component.html',
  styleUrls: ['./machine-translation.component.css']
})
export class MachineTranslationComponent {
  // Define the structure of the translation request.
  private translationRequest: {
    q: string;
    source: string;
    target: string;
    format: string;
  };

  // Endpoint URL for the translation API.
  private translationApiUrl: string = 'https://api.example.com/translate';

  // Default format for translation request.
  private format: string = 'text';

  // Stores the translated text.
  private translatedText: string;

  // Stores the error message.
  private errorMessage: string;

  constructor(private http: HttpClient) {
    // Initialize the translation request.
    this.translationRequest = {
      q: '',
      source: 'en',
      target: 'es', // Default target language.
      format: this.format
    };
  }

  // Method to handle the translation process.
  translateText(): void {
    this.translatedText = '';
    this.errorMessage = '';
    this.translationRequest.q = this.translationRequest.q.trim();

    if (!this.translationRequest.q) {
      this.errorMessage = 'Please enter the text to translate.';
      return;
    }

    this.http.post<{ data: { translations: [{ translatedText: string }] } }>(
      this.translationApiUrl,
      this.translationRequest
    ).pipe(
      retry(3),
      catchError(this.handleError.bind(this))
    ).subscribe(
      (response) => {
        this.translatedText = response.data.translations[0].translatedText;
      },
      (error) => {
        this.errorMessage = 'Translation failed: ' + error.message;
      }
    );
  }

  // Error handling for the translation request.
  private handleError(error: any): Observable<never> {
    // Log the error and return an error observable.
    console.error('Translation error:', error);
    return throwError('Translation error occurred');
  }
}
