/**
 * Shape of every validation error returned by this package.
 *
 * WHY NOT JUST { pan: true }?
 * Most validators return { pan: true } which gives Angular
 * no message to show in the template. Our error always includes
 * a human-readable message so the template can display it
 * without writing any extra code.
 *
 * @example
 * // In your Angular template:
 * <span *ngIf="control.errors?.['pan']">
 *   {{ control.errors?.['pan']?.message }}
 * </span>
 */
export interface BharatValidationError {
  /** The original value that failed validation */
  value: string;
  /** Human-readable message shown to the user */
  message: string;
}