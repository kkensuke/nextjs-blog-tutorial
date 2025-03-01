/**
 * Validation utility functions
 */

/**
 * Validates an email address format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validates a password meets minimum requirements
 * - At least 8 characters
 * - Contains at least one number
 * - Contains at least one uppercase letter
 */
export function isValidPassword(password: string): boolean {
  if (password.length < 8) return false;
  if (!/\d/.test(password)) return false;
  if (!/[A-Z]/.test(password)) return false;
  
  return true;
}

/**
 * Validates a URL format
 */
export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
}

/**
 * Checks if a value is empty (null, undefined, empty string, or empty array)
 */
export function isEmpty(value: any): boolean {
  if (value === null || value === undefined) return true;
  if (typeof value === 'string') return value.trim() === '';
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === 'object') return Object.keys(value).length === 0;
  
  return false;
}

/**
 * Create validation errors for form fields
 */
export function validateFormFields<T extends Record<string, any>>(
  values: T,
  validations: Record<keyof T, (value: any) => string | null>
): Partial<Record<keyof T, string>> {
  const errors: Partial<Record<keyof T, string>> = {};
  
  for (const key in validations) {
    if (Object.prototype.hasOwnProperty.call(validations, key)) {
      const error = validations[key](values[key]);
      if (error) {
        errors[key] = error;
      }
    }
  }
  
  return errors;
}