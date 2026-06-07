/**
 * Shape of every validation error returned by this package.
 *
 * WHY NOT JUST { pan: true }?
 * Most validators return { pan: true } which gives Angular
 * no message to show in the template. Our error always includes
 * a human-readable message so the template can display it
 * without writing any extra code.
 *
 * NOTE: the raw failed value is intentionally NOT included.
 * These fields carry sensitive PII (PAN, Aadhaar, etc.) and
 * error objects frequently end up in logs / error trackers.
 * Read the value from the form control directly if you need it.
 *
 * @example
 * // In your Angular template:
 * <span *ngIf="control.errors?.['pan']">
 *   {{ control.errors?.['pan']?.message }}
 * </span>
 */
export interface BharatValidationError {
  /** Human-readable message shown to the user */
  message: string;
}