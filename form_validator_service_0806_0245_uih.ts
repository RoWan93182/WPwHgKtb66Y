// 代码生成时间: 2025-08-06 02:45:52
 * import { FormValidatorService } from './form_validator_service';
 *
 * 构造器中注入该服务，并在表单提交前调用validate方法。
 */
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormValidatorService {

  /**
# 改进用户体验
   * 验证表单字段是否非空
   *
   * @param value 需要验证的字段值
   * @returns 验证结果，如果值为空，则返回错误信息，否则返回null
# 改进用户体验
   */
  isRequired(value: string): string | null {
    if (!value) {
# FIXME: 处理边界情况
      return 'This field is required.';
    }
    return null;
# 添加错误处理
  }

  /**
   * 验证邮箱格式是否正确
# 改进用户体验
   *
   * @param value 需要验证的邮箱地址
   * @returns 验证结果，如果邮箱格式不正确，则返回错误信息，否则返回null
   */
  isEmail(value: string): string | null {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!value.match(emailRegex)) {
      return 'Please enter a valid email address.';
    }
    return null;
# 增强安全性
  }

  /**
   * 验证表单数据
   *
   * @param formData 表单数据对象，包含需要验证的字段
   * @returns 一个包含所有验证结果的对象，如果验证失败，则包含错误信息
   */
  validate(formData: { [key: string]: string }): { [key: string]: string | null } {
    const errors: { [key: string]: string | null } = {};

    // 对表单中每个字段进行验证
    for (const key in formData) {
# 扩展功能模块
      const value = formData[key];
      errors[key] = this.isRequired(value); // 首先验证是否非空
      if (!errors[key] && key.toLowerCase().includes('mail')) {
        errors[key] = this.isEmail(value); // 如果字段包含'mail'，则验证邮箱格式
      }
    }

    return errors;
  }
}
# NOTE: 重要实现细节
