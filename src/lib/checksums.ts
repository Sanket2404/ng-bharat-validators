// ─────────────────────────────────────────────────────────
// CHECKSUM ALGORITHMS
//
// Format regex tells you a value LOOKS right.
// A checksum tells you the value is INTERNALLY CONSISTENT —
// i.e. not a random typo or a made-up number.
//
// These do NOT prove the document exists in a government
// database. They only reject values that fail the official
// check-digit math. Always verify real documents server-side
// against the issuing authority (UIDAI / GSTN / RBI / etc.).
// ─────────────────────────────────────────────────────────

/**
 * Verhoeff checksum — used by Aadhaar (UIDAI).
 *
 * The 12th digit of a real Aadhaar is a Verhoeff check digit
 * computed over the first 11 digits. A random "12 digits
 * starting 2–9" string will almost always fail this.
 */
const VERHOEFF_D = [
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  [1, 2, 3, 4, 0, 6, 7, 8, 9, 5],
  [2, 3, 4, 0, 1, 7, 8, 9, 5, 6],
  [3, 4, 0, 1, 2, 8, 9, 5, 6, 7],
  [4, 0, 1, 2, 3, 9, 5, 6, 7, 8],
  [5, 9, 8, 7, 6, 0, 4, 3, 2, 1],
  [6, 5, 9, 8, 7, 1, 0, 4, 3, 2],
  [7, 6, 5, 9, 8, 2, 1, 0, 4, 3],
  [8, 7, 6, 5, 9, 3, 2, 1, 0, 4],
  [9, 8, 7, 6, 5, 4, 3, 2, 1, 0],
];

const VERHOEFF_P = [
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  [1, 5, 7, 6, 2, 8, 3, 0, 9, 4],
  [5, 8, 0, 3, 7, 9, 6, 1, 4, 2],
  [8, 9, 1, 6, 0, 4, 3, 5, 2, 7],
  [9, 4, 5, 3, 1, 2, 6, 8, 7, 0],
  [4, 2, 8, 6, 5, 7, 3, 9, 0, 1],
  [2, 7, 9, 3, 8, 0, 6, 4, 1, 5],
  [7, 0, 4, 6, 9, 1, 3, 2, 5, 8],
];

/**
 * Returns true if the all-digit string passes the Verhoeff
 * checksum (last digit is the valid check digit for the rest).
 * Expects a string of digits only — caller normalises first.
 */
export function isAadhaarChecksumValid(digits: string): boolean {
  if (!/^[0-9]+$/.test(digits)) return false;
  let c = 0;
  const reversed = digits.split('').reverse();
  for (let i = 0; i < reversed.length; i++) {
    c = VERHOEFF_D[c][VERHOEFF_P[i % 8][Number(reversed[i])]];
  }
  return c === 0;
}

/**
 * GSTIN checksum — the 15th character is a mod-36 check
 * computed over the first 14 characters (GSTN specification).
 *
 * Catches transposed digits / typos that a format regex
 * cannot see.
 */
const GSTIN_CODEPOINTS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';

/**
 * Returns true if the 15-char GSTIN's final character matches
 * the check character computed from the first 14.
 * Expects an uppercase 15-char string — caller normalises first.
 */
export function isGstinChecksumValid(gstin: string): boolean {
  if (gstin.length !== 15) return false;
  const mod = GSTIN_CODEPOINTS.length; // 36
  let factor = 2;
  let sum = 0;
  for (let i = 13; i >= 0; i--) {
    const codePoint = GSTIN_CODEPOINTS.indexOf(gstin[i]);
    if (codePoint < 0) return false;
    let digit = factor * codePoint;
    factor = factor === 2 ? 1 : 2;
    digit = Math.floor(digit / mod) + (digit % mod);
    sum += digit;
  }
  const checkCodePoint = (mod - (sum % mod)) % mod;
  return GSTIN_CODEPOINTS[checkCodePoint] === gstin[14];
}
