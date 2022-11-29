import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function userNameValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const userName = control.value;
    if (!userName) {
      return null;
    }
    return /[(){}".![\]]+/.test(userName) ? { invalidCharacter: true } : null;
  }
}
