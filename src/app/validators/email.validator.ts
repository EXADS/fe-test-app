import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function emailValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const email = control.value;
    return !email ||  /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/.test(email) ? null: { invalidEmail: true };
  }
}
