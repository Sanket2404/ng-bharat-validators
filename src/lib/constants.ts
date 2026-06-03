

// ─────────────────────────────────────────────────────────
// SECURITY LIMIT
// Rejects any input longer than this before running regex.
// Prevents ReDoS attacks — attacker can't send 10,000 char
// strings to hang your regex engine.
// No valid Indian document is longer than 20 characters.
// ─────────────────────────────────────────────────────────
export const MAX_INPUT_LENGTH = 500;

// ─────────────────────────────────────────────────────────
// REGEX PATTERNS
// All patterns defined as named constants here — never
// written inline inside functions. One place to review,
// one place to fix.
// ─────────────────────────────────────────────────────────

/**
 * PAN — Format: AAAAA9999A
 * 5 letters + 4 digits + 1 letter = 10 chars total
 * Example: ABCDE1234F
 */
export const PAN_REGEX = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;

/**
 * AADHAAR — 12 digits, first digit must be 2–9
 * First digit is never 0 or 1 — UIDAI specification
 * Example: 234567890123
 */
export const AADHAAR_REGEX = /^[2-9][0-9]{11}$/;

/**
 * GSTIN — 15 characters
 * Position 1–2:  State code (01–37)
 * Position 3–12: PAN of entity
 * Position 13:   Entity number (1–9 or A–Z)
 * Position 14:   Always Z
 * Position 15:   Checksum (0–9 or A–Z)
 * Example: 27ABCDE1234F1Z5
 */
export const GSTIN_REGEX = /^[0-3][0-9][A-Z]{5}[0-9]{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/;
export const GSTIN_STATE_MIN = 1;
export const GSTIN_STATE_MAX = 37;

/**
 * IFSC — 11 characters
 * Position 1–4: Bank code (4 letters) e.g. SBIN, HDFC
 * Position 5:   Always 0 (zero)
 * Position 6–11: Branch code (6 alphanumeric)
 * Example: SBIN0005943
 */
export const IFSC_REGEX = /^[A-Z]{4}0[A-Z0-9]{6}$/;

/**
 * PINCODE — 6 digits, first digit 1–9
 * Example: 411001 (Pune), 400001 (Mumbai)
 */
export const PINCODE_REGEX = /^[1-9][0-9]{5}$/;

/**
 * MOBILE — 10 digits starting with 6, 7, 8, or 9
 * Applied AFTER stripping +91 / 91 / 0 prefix
 * Example: 9876543210
 */
export const MOBILE_CORE_REGEX = /^[6-9][0-9]{9}$/;

/**
 * VEHICLE — State code + RTO + Series + Number
 * Example: MH12AB1234, DL4CAF0001
 */
export const VEHICLE_REGEX = /^[A-Z]{2}[0-9]{1,2}[A-Z]{1,3}[0-9]{1,4}$/;

/**
 * VOTER ID — 3 letters + 7 digits
 * Example: ABC1234567
 */
export const VOTER_ID_REGEX = /^[A-Z]{3}[0-9]{7}$/;

/**
 * PASSPORT — 1 letter + 7 digits
 * Example: A1234567
 */
export const PASSPORT_REGEX = /^[A-PR-WY][1-9][0-9]{5}[1-9]$/;

/**
 * UPI — username@bankhandle
 * Example: name@okicici, 9876543210@paytm
 */
export const UPI_REGEX = /^[a-zA-Z0-9.\-_]{2,49}@[a-zA-Z]{2,20}$/;

/**
 * DRIVING LICENSE — State code + 13 digits
 * Example: MH1420110012345 or MH-1420110012345
 */
export const DL_REGEX_1 = /^[A-Z]{2}[0-9]{13}$/;
export const DL_REGEX_2 = /^[A-Z]{2}-[0-9]{2}[0-9]{11}$/;

// ─────────────────────────────────────────────────────────
// ERROR MESSAGES
// All user-facing messages in one place.
// Change the message here — it updates everywhere.
// ─────────────────────────────────────────────────────────
export const MESSAGES: Record<string, string> = {
  pan:            'Invalid PAN number. Format: ABCDE1234F',
  aadhaar:        'Invalid Aadhaar. Must be 12 digits starting with 2–9',
  gstin:          'Invalid GSTIN. Format: 27ABCDE1234F1Z5',
  ifsc:           'Invalid IFSC code. Format: SBIN0005943',
  pincode:        'Invalid pincode. Must be 6 digits starting with 1–9',
  mobile:         'Invalid mobile number. Must be 10 digits starting with 6–9',
  vehicleNumber:  'Invalid vehicle number. Format: MH12AB1234',
  voterId:        'Invalid Voter ID. Format: ABC1234567',
  passport:       'Invalid passport number. Format: A1234567',
  upi:            'Invalid UPI ID. Format: name@okicici',
  drivingLicense: 'Invalid driving license number',
};