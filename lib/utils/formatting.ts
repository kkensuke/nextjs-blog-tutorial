/**
 * Formatting utility functions
 */

/**
 * Formats a date string into a localized format
 */
export function formatDate(dateString: string, locale: string = 'en-US'): string {
  try {
    const date = new Date(dateString);
    
    // Check for invalid date
    if (isNaN(date.getTime())) {
      return dateString;
    }
    
    return date.toLocaleDateString(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch (error) {
    console.error('Error formatting date:', error);
    return dateString;
  }
}

/**
 * Formats a currency amount
 */
export function formatCurrency(amount: number, currency: string = 'USD', locale: string = 'en-US'): string {
  try {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
    }).format(amount);
  } catch (error) {
    console.error('Error formatting currency:', error);
    return `${currency} ${amount}`;
  }
}

/**
 * Truncates text to a specified length with ellipsis
 */
export function truncateText(text: string, maxLength: number = 100): string {
  if (text.length <= maxLength) {
    return text;
  }
  
  return text.slice(0, maxLength) + '...';
}

/**
 * Converts a string to kebab-case (for slugs)
 */
export function toKebabCase(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove non-word chars
    .replace(/[\s_]+/g, '-')   // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, '');  // Remove leading/trailing hyphens
}

/**
 * Formats a file size in bytes to a human-readable format
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  
  return `${parseFloat((bytes / Math.pow(1024, i)).toFixed(2))} ${sizes[i]}`;
}