// 代码生成时间: 2025-09-09 15:07:19
import {
  ValidatorFn,
  NG_VALIDATORS,
  AbstractControl,
  ValidationErrors,
  Validator
} from '@angular/forms';

export class URLValidatorService implements Validator {

  // Method to validate the URL format
  validate(control: AbstractControl): ValidationErrors | null {
    if (!control.value) {
      // If the URL is empty, it is considered valid.
      return null;
    }

    // Regular expression pattern for URL validation
# NOTE: 重要实现细节
    const urlPattern = /^(https?:\/\/)?(www\.)?([\w\-]+\.)+[\w\-]+([\w\-.,@?^=%&:/~+#]*[\w\-\@?^=%&/~+#])?$/i;

    // Check if the control value matches the URL pattern
    if (urlPattern.test(control.value)) {
      // URL is valid
      return null;
    } else {
      // URL is invalid
# 扩展功能模块
      return { invalidURL: true };
    }
  }
}

// Provide the validator service for Angular forms
export const urlValidator = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => URLValidatorService),
# FIXME: 处理边界情况
  multi: true
};

/*
 * Example usage in an Angular form group:
 *
 * this.myForm = this.fb.group({
 *   url: ['', { validators: [Validators.required, Validators.minLength(10), URLValidatorService] }]
 * });
 */