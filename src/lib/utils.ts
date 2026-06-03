import { MAX_INPUT_LENGTH } from './constants';

/**
 * Converts ANY input into a clean uppercase trimmed string.
 *
 * This single function prevented the production bug we studied.
 * Without this — 'abcde1234f' fails PAN regex.
 * With this    — 'abcde1234f' becomes 'ABCDE1234F' and passes.
 *
 * Handles: null, undefined, numbers, strings with spaces.
 */
export function normalize(value: unknown): string {
  if (value == null) return '';
  return String(value).toUpperCase().trim();
}

/**
 * Safety check before running any regex.
 *
 * Two things this blocks:
 * 1. Empty strings — let Angular's Validators.required handle those
 * 2. Strings over 500 chars — blocks ReDoS attack attempts
 */
export function isSafeInput(value: string): boolean {
  if (value.length === 0) return false;
  if (value.length > MAX_INPUT_LENGTH) return false;
  return true;
}

/**
 * Removes ALL spaces from a string.
 * Used for Aadhaar ('2345 6789 0123') and vehicle numbers ('MH 12 AB 1234')
 */
export function removeSpaces(value: string): string {
  return value.replace(/\s+/g, '');
}

/**
 * Strips Indian mobile prefixes before validation.
 * Handles: +919876543210 → 9876543210
 *          919876543210  → 9876543210
 *          09876543210   → 9876543210
 */
export function stripMobilePrefix(value: string): string {
  return value.replace(/^(\+91|91|0)/, '');
}