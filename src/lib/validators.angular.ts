import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { MESSAGES } from './constants';
import {
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
} from './validators.raw';

function makeValidator(
  key: string,
  fn: (v: unknown) => boolean
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) return null;
    // NOTE: we deliberately do NOT echo the raw control value
    // back in the error object. These fields hold sensitive PII
    // (PAN, Aadhaar, etc.) and validator errors often get
    // serialised into logs / error trackers (Sentry, LogRocket).
    // The raw value is still available on the control itself if
    // you genuinely need it. Errors carry only a safe message.
    return fn(control.value)
      ? null
      : { [key]: { message: MESSAGES[key] } };
  };
}

export const panValidator         = (): ValidatorFn => makeValidator('pan', isValidPAN);
export const aadhaarValidator     = (): ValidatorFn => makeValidator('aadhaar', isValidAadhaar);
export const gstinValidator       = (): ValidatorFn => makeValidator('gstin', isValidGSTIN);
export const ifscValidator        = (): ValidatorFn => makeValidator('ifsc', isValidIFSC);
export const pincodeValidator     = (): ValidatorFn => makeValidator('pincode', isValidPincode);
export const mobileValidator      = (): ValidatorFn => makeValidator('mobile', isValidIndianMobile);
export const vehicleNumberValidator = (): ValidatorFn => makeValidator('vehicleNumber', isValidVehicleNumber);
export const voterIdValidator     = (): ValidatorFn => makeValidator('voterId', isValidVoterID);
export const passportValidator    = (): ValidatorFn => makeValidator('passport', isValidPassport);
export const upiValidator         = (): ValidatorFn => makeValidator('upi', isValidUPI);
export const drivingLicenseValidator = (): ValidatorFn => makeValidator('drivingLicense', isValidDrivingLicense);

export const BharatValidators = {
  pan:            panValidator,
  aadhaar:        aadhaarValidator,
  gstin:          gstinValidator,
  ifsc:           ifscValidator,
  pincode:        pincodeValidator,
  mobile:         mobileValidator,
  vehicleNumber:  vehicleNumberValidator,
  voterId:        voterIdValidator,
  passport:       passportValidator,
  upi:            upiValidator,
  drivingLicense: drivingLicenseValidator,
} as const;
