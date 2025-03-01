/**
 * Utility functions index
 * Re-exports all utility functions for convenient imports
 */

// Re-export utility functions
export * from './formatting';
export * from './validation';

// Export the cn function from the current utils file
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines and merges class names using clsx and tailwind-merge
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}