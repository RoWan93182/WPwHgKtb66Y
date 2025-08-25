// 代码生成时间: 2025-08-25 10:19:03
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

/**
 * 登录接口返回的数据结构
 */
interface LoginResponse {
  success: boolean;
  message: string;
  token?: string;
}

/**
 * 用户登录验证服务
 */
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private loginUrl = 'http://your-api-url.com/api/login'; // 替换为你的API URL

  constructor(private http: HttpClient) {}

  /**
   * 用户登录验证
   * @param username 用户名
   * @param password 密码
   * @returns 登录结果
   */
  login(username: string, password: string): Observable<LoginResponse> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<LoginResponse>(this.loginUrl, { username, password }, { headers })
      .pipe(
        retry(3), // 重试机制
        catchError(this.handleError) // 错误处理
      );
  }

  /**
   * 私有方法：处理错误
   * @param error 错误对象
   * @returns 错误信息
   */
  private handleError(error: any) {
    let errorMessage = 'An error occurred';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Server returned code ${error.status} with body: ${error.error}`;
    }
    return throwError(errorMessage);
  }
}

/**
 * 登录组件
 */
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './login_service'; // 替换为实际路径

@Component({
  selector: 'app-login',
  template: `
    <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" novalidate>
      <label for="username">Username</label>
      <input id="username" formControlName="username" type="text" required>
      <div *ngIf="loginForm.get('username').errors?.required && loginForm.get('username').touched">
        Username is required.
      </div>

      <label for="password">Password</label>
      <input id="password" formControlName="password" type="password" required>
      <div *ngIf="loginForm.get('password').errors?.required && loginForm.get('password').touched">
        Password is required.
      </div>

      <button type="submit" [disabled]="!loginForm.valid">Login</button>
      <div *ngIf="errorMessage">{{ errorMessage }}</div>
    </form>
  `,
  styles: []
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  /**
   * 提交登录表单
   */
  onSubmit() {
    this.errorMessage = null;
    this.loginService.login(this.loginForm.value.username, this.loginForm.value.password)
      .subscribe({
        next: (response) => {
          if (response.success) {
            localStorage.setItem('token', response.token);
            this.router.navigate(['/dashboard']); // 替换为你的路由
          } else {
            this.errorMessage = response.message;
          }
        },
        error: (error) => {
          this.errorMessage = error;
        }
      });
  }
}