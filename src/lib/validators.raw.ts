import {
  PAN_REGEX,
  AADHAAR_REGEX,
  GSTIN_REGEX,
  GSTIN_STATE_MIN,
  GSTIN_STATE_MAX,
  IFSC_REGEX,
  PINCODE_REGEX,
  MOBILE_CORE_REGEX,
  VEHICLE_REGEX,
  VOTER_ID_REGEX,
  PASSPORT_REGEX,
  UPI_REGEX,
  DL_REGEX_1,
  DL_REGEX_2,
} from './constants';

import { normalize, isSafeInput, removeSpaces, stripMobilePrefix } from './utils';
import { isAadhaarChecksumValid, isGstinChecksumValid } from './checksums';

export function isValidPAN(value: unknown): boolean {
  const clean = normalize(value);
  if (!isSafeInput(clean)) return false;
  return PAN_REGEX.test(clean);
}

export function isValidAadhaar(value: unknown): boolean {
  const clean = normalize(value);
  if (!isSafeInput(clean)) return false;
  const digits = removeSpaces(clean).replace(/-/g, '');
  if (!AADHAAR_REGEX.test(digits)) return false;
  // Verify the Verhoeff check digit — rejects typos / made-up
  // numbers that happen to match the "12 digits, 2–9" shape.
  return isAadhaarChecksumValid(digits);
}

export function isValidGSTIN(value: unknown): boolean {
  const clean = normalize(value);
  if (!isSafeInput(clean)) return false;
  if (!GSTIN_REGEX.test(clean)) return false;
  const stateCode = parseInt(clean.substring(0, 2), 10);
  if (stateCode < GSTIN_STATE_MIN || stateCode > GSTIN_STATE_MAX) return false;
  // Verify the 15th-character check digit (GSTN mod-36).
  return isGstinChecksumValid(clean);
}

export function isValidIFSC(value: unknown): boolean {
  const clean = normalize(value);
  if (!isSafeInput(clean)) return false;
  return IFSC_REGEX.test(clean);
}

export function isValidPincode(value: unknown): boolean {
  const clean = normalize(value);
  if (!isSafeInput(clean)) return false;
  return PINCODE_REGEX.test(clean);
}

export function isValidIndianMobile(value: unknown): boolean {
  const clean = normalize(value);
  if (!isSafeInput(clean)) return false;
  const noSpaces = removeSpaces(clean).replace(/-/g, '');
  const core = stripMobilePrefix(noSpaces);
  return MOBILE_CORE_REGEX.test(core);
}

export function isValidVehicleNumber(value: unknown): boolean {
  const clean = normalize(value);
  if (!isSafeInput(clean)) return false;
  const noSpaces = removeSpaces(clean);
  return VEHICLE_REGEX.test(noSpaces);
}

export function isValidVoterID(value: unknown): boolean {
  const clean = normalize(value);
  if (!isSafeInput(clean)) return false;
  return VOTER_ID_REGEX.test(clean);
}

export function isValidPassport(value: unknown): boolean {
  const clean = normalize(value);
  if (!isSafeInput(clean)) return false;
  return PASSPORT_REGEX.test(clean);
}

export function isValidUPI(value: unknown): boolean {
  if (value == null) return false;
  const clean = String(value).trim();
  if (!isSafeInput(clean)) return false;
  return UPI_REGEX.test(clean);
}

export function isValidDrivingLicense(value: unknown): boolean {
  const clean = normalize(value);
  if (!isSafeInput(clean)) return false;
  return DL_REGEX_1.test(clean) || DL_REGEX_2.test(clean);
}

export const BharatUtils = {
  isValidPAN,
  isValidAadhaar,
  isValidGSTIN,
  isValidIFSC,
  isValidPincode,
  isValidIndianMobile,
  isValidVehicleNumber,
  isValidVoterID,
  isValidPassport,
  isValidUPI,
  isValidDrivingLicense,
} as const;
