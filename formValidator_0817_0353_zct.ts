// 代码生成时间: 2025-08-17 03:53:52
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * Custom validator function that checks if the field value is not empty.
 * @param control - The Angular form control to validate.
 * @returns ValidationErrors or null if the field is valid.
 */
export const nonEmptyValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  if (control.value === '' || control.value == null) {
    return { nonEmpty: true };
  }
  return null;
};

/**
 * Custom validator function that checks if the field value is a valid email.
 * @param control - The Angular form control to validate.
 * @returns ValidationErrors or null if the field is valid.
 */
export const emailValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(control.value)) {
    return { email: true };
  }
  return null;
};

/**
 * Custom validator function that checks if the password meets certain criteria.
 * @param control - The Angular form control to validate.
 * @returns ValidationErrors or null if the password is valid.
 */
export const passwordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,}$/;
  if (!passwordRegex.test(control.value)) {
    return { password: true };
  }
  return null;
};

/**
 * Custom validator function that checks if the confirm password matches the original password.
 * @param passwordControl - The Angular form control for the original password.
 * @param confirmPasswordControl - The Angular form control for the confirm password.
 * @returns ValidatorFn that returns ValidationErrors or null.
 */
export function confirmPasswordValidator(passwordControl: AbstractControl, confirmPasswordControl: AbstractControl): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (passwordControl.value !== confirmPasswordControl.value) {
      return { passwordMismatch: true };
    }
    return null;
  };
}
