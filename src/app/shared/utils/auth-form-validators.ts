import { AbstractControl, ValidationErrors } from '@angular/forms';

export function emailValidator(
  control: AbstractControl<string, string>
): ValidationErrors | null {
  const MAX_LENGHT = 63;
  const MIN_LENGHT = 10;
  let errorMessage: string = '';
  const { value } = control;

  switch (true) {
    case value.length === 0:
      errorMessage = 'Email is required';
      break;
    case value.length < MIN_LENGHT:
      errorMessage = `Must be more than ${MIN_LENGHT} characters`;
      break;
    case value.length > MAX_LENGHT:
      errorMessage = `Must be less than ${MAX_LENGHT} characters`;
      break;
    case !/\.([a-zA-Z]{2,})$/.test(value):
      errorMessage = "Must contain at least 2 characters after '.'";
      break;
    case /-$/.test(value):
      errorMessage = "Сannot end with '-'";
      break;
    case /^-/.test(value):
      errorMessage = "Сannot start with '-'";
      break;
    case !/^([a-zA-Z0-9._%+]{1}[a-zA-Z0-9._%-]{1,})@[a-zA-Z0-9.-]+\.([a-zA-Z]{2,})$/.test(
      value
    ):
      errorMessage =
        "Must contains only letters, numbers, special characters, '.' or '@'";
      break;
    default:
      errorMessage = '';
  }

  return errorMessage ? { invalidEmail: { value: errorMessage } } : null;
}

export function passwordValidator(
  control: AbstractControl
): ValidationErrors | null {
  const MAX_LENGHT = 30;
  const MIN_LENGHT = 5;
  let errorMessage: string = '';
  const { value } = control;

  switch (true) {
    case value.length === 0:
      errorMessage = 'Password is required';
      break;
    case value.length < MIN_LENGHT:
      errorMessage = `Must be more than ${MIN_LENGHT} characters`;
      break;
    case value.length > MAX_LENGHT:
      errorMessage = `Must be less than ${MAX_LENGHT} characters`;
      break;
    case /^[.-]/.test(value):
      errorMessage = "Сannot start with '-' or '.'";
      break;
    case /[ ]/.test(value):
      errorMessage = 'Сannot contains space';
      break;
    case !/^[a-zA-Z0-9!@#$%^&*()_+\=[\]{};':"|,<>/?][a-zA-Z0-9!@#$%^&*()_+\-=[\]{};':"|,.<>/?]+$/.test(
      value
    ):
      errorMessage = 'Must contains only letters, numbers, special characters';
      break;
    default:
      errorMessage = '';
  }

  return errorMessage ? { invalidPassword: { value: errorMessage } } : null;
}
