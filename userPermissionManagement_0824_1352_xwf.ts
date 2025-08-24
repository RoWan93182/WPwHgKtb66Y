// 代码生成时间: 2025-08-24 13:52:50
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

// 假设的用户权限数据
interface IUserPermission {
  id: number;
  username: string;
  roles: string[];
}

// 用户权限管理系统服务
@Injectable({
  providedIn: 'root'
})
export class UserPermissionService {

  private permissions: IUserPermission[] = [
    {
      id: 1,
      username: 'admin',
      roles: ['admin', 'user']
    },
    {
      id: 2,
      username: 'user',
      roles: ['user']
    }
  ];

  constructor() {}

  // 根据用户名获取用户权限
  getUserPermissions(username: string): Observable<IUserPermission> {
    return of(this.permissions).pipe(
      map((permissions) => permissions.find((permission) => permission.username === username)),
      catchError((error) => throwError('Error fetching user permissions')));
  }

  // 添加用户权限
  addUserPermission(userPermission: IUserPermission): Observable<IUserPermission> {
    // 简单的错误处理，实际项目中应该更详细
    if (!userPermission) {
      return throwError('User permission data is required');
    }

    this.permissions.push(userPermission);
    return of(userPermission);
  }

  // 更新用户权限
  updateUserPermission(id: number, updatedUserPermission: IUserPermission): Observable<IUserPermission> {
    const index = this.permissions.findIndex((permission) => permission.id === id);
    if (index === -1) {
      return throwError('User permission not found');
    }

    this.permissions[index] = updatedUserPermission;
    return of(updatedUserPermission);
  }

  // 删除用户权限
  deleteUserPermission(id: number): Observable<void> {
    const index = this.permissions.findIndex((permission) => permission.id === id);
    if (index === -1) {
      return throwError('User permission not found');
    }

    this.permissions.splice(index, 1);
    return of(undefined);
  }
}

// 用户权限管理系统组件
import { Component, OnInit } from '@angular/core';
import { UserPermissionService, IUserPermission } from './userPermissionManagement';

@Component({
  selector: 'app-user-permission-management',
  templateUrl: './user-permission-management.component.html',
  styleUrls: ['./user-permission-management.component.css']
})
export class UserPermissionManagementComponent implements OnInit {

  permissions: IUserPermission[] = [];
  selectedUsername: string = '';
  error: string | null = null;

  constructor(private userPermissionService: UserPermissionService) {}

  ngOnInit(): void {
    this.fetchPermissions();
  }

  fetchPermissions(): void {
    this.userPermissionService.getUserPermissions(this.selectedUsername).subscribe({
      next: (permission) => {
        this.permissions = [permission];
        this.error = null;
      },
      error: (error) => {
        this.error = error.message;
      },
    });
  }

  handleAddPermission(): void {
    const newPermission: IUserPermission = {
      id: Date.now(),
      username: this.selectedUsername,
      roles: []
    };

    this.userPermissionService.addUserPermission(newPermission).subscribe({
      next: (permission) => {
        this.permissions.push(permission);
        this.error = null;
      },
      error: (error) => {
        this.error = error.message;
      },
    });
  }

  handleUpdatePermission(updatedPermission: IUserPermission): void {
    this.userPermissionService.updateUserPermission(updatedPermission.id, updatedPermission).subscribe({
      next: (permission) => {
        const index = this.permissions.findIndex((p) => p.id === permission.id);
        if (index !== -1) {
          this.permissions[index] = permission;
        }
        this.error = null;
      },
      error: (error) => {
        this.error = error.message;
      },
    });
  }

  handleDeletePermission(permissionId: number): void {
    this.userPermissionService.deleteUserPermission(permissionId).subscribe({
      next: () => {
        this.permissions = this.permissions.filter((permission) => permission.id !== permissionId);
        this.error = null;
      },
      error: (error) => {
        this.error = error.message;
      },
    });
  }
}
