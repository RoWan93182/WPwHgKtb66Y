// 代码生成时间: 2025-09-08 00:16:07
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

// Interface to represent the User model
interface User {
    username: string;
    password: string;
}

// Service responsible for handling login operations
@Injectable({
    providedIn: 'root'
})
export class LoginService {
    private loginUrl = 'http://api.example.com/login'; // URL to the login API

    constructor(private http: HttpClient) { }

    // Method to perform login operation
    login(user: User): Observable<any> {
        return this.http.post(this.loginUrl, user).pipe(
            catchError(this.handleError)
        );
    }

    // Error handler for HTTP operations
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

// Component to handle user interaction for login
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
    loginForm: FormGroup;
    
    constructor(private fb: FormBuilder, private loginService: LoginService) {
        this.loginForm = this.fb.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }
    
    // Method to handle the login form submission
    onLoginSubmit() {
        if (this.loginForm.valid) {
            const user = this.loginForm.value;
            this.loginService.login(user).subscribe({
                next: (response) => {
                    console.log('Login successful:', response);
                },
                error: (error) => {
                    console.error('Login failed:', error);
                }
            });
        } else {
            console.error('Login form is not valid.');
        }
    }
}
