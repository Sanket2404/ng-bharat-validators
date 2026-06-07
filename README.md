# ng-bharat-validators

[![npm version](https://img.shields.io/npm/v/ng-bharat-validators.svg)](https://www.npmjs.com/package/ng-bharat-validators)
[![license](https://img.shields.io/npm/l/ng-bharat-validators.svg)](./LICENSE)
[![types](https://img.shields.io/npm/types/ng-bharat-validators.svg)](https://www.npmjs.com/package/ng-bharat-validators)

> Angular reactive form validators for Indian formats — PAN, Aadhaar, GSTIN, IFSC, Pincode, Mobile and more.
> Also works in React, Vue, and Node.js.

## Installation

```bash
npm install ng-bharat-validators
```

## Usage in Angular

```ts
import { BharatValidators } from 'ng-bharat-validators';

this.form = this.fb.group({
  pan:     ['', [Validators.required, BharatValidators.pan()]],
  aadhaar: ['', [Validators.required, BharatValidators.aadhaar()]],
  gstin:   ['', [Validators.required, BharatValidators.gstin()]],
  ifsc:    ['', [Validators.required, BharatValidators.ifsc()]],
  pincode: ['', [Validators.required, BharatValidators.pincode()]],
  mobile:  ['', [Validators.required, BharatValidators.mobile()]],
  upi:     ['', [BharatValidators.upi()]],
});
```

## Show error messages in template

```html
<input formControlName="pan" />
<span *ngIf="form.get('pan')?.errors?.['pan']">
  {{ form.get('pan')?.errors?.['pan']?.message }}
</span>
```

## Usage in React / Vue / Node.js

```ts
import { BharatUtils } from 'ng-bharat-validators';

BharatUtils.isValidPAN('ABCDE1234F')        // true
BharatUtils.isValidAadhaar('234567890124')  // true  (valid Verhoeff check digit)
BharatUtils.isValidGSTIN('27ABCDE1234F1Z0') // true  (valid checksum)
BharatUtils.isValidIFSC('SBIN0005943')      // true
BharatUtils.isValidPincode('411001')        // true
BharatUtils.isValidIndianMobile('9876543210') // true
```

## All Validators

| Validator | Angular | Raw |
|---|---|---|
| PAN card | `BharatValidators.pan()` | `isValidPAN()` |
| Aadhaar | `BharatValidators.aadhaar()` | `isValidAadhaar()` |
| GSTIN | `BharatValidators.gstin()` | `isValidGSTIN()` |
| IFSC | `BharatValidators.ifsc()` | `isValidIFSC()` |
| Pincode | `BharatValidators.pincode()` | `isValidPincode()` |
| Mobile | `BharatValidators.mobile()` | `isValidIndianMobile()` |
| Vehicle number | `BharatValidators.vehicleNumber()` | `isValidVehicleNumber()` |
| Voter ID | `BharatValidators.voterId()` | `isValidVoterID()` |
| Passport | `BharatValidators.passport()` | `isValidPassport()` |
| UPI ID | `BharatValidators.upi()` | `isValidUPI()` |
| Driving license | `BharatValidators.drivingLicense()` | `isValidDrivingLicense()` |

## Why this package

- Works directly with Angular `FormBuilder` — no wrapper code needed
- **Real checksum validation** for Aadhaar (Verhoeff) and GSTIN (mod-36), not just format matching — catches typos and made-up numbers
- Every error includes a human-readable `message` property
- **Privacy-safe errors** — the raw value you typed is never copied into the error object, so PAN/Aadhaar numbers don't leak into logs or error trackers
- Handles lowercase, spaces, +91 prefix automatically
- Works in React, Vue, Node.js via `BharatUtils`
- Full TypeScript support with autocomplete
- Hardened against ReDoS (input length capped) — malicious input always returns `false`, never throws

## Format vs. real-document validation — please read

This library checks that a value is **well-formed and internally consistent** (correct shape, and a valid checksum where one exists). It does **not** prove that a document actually exists or belongs to a person.

- ✅ Great for: instant client-side UX feedback, catching typos before submit, basic data hygiene.
- ❌ Not a substitute for: real KYC / identity verification. For that, always verify server-side against the issuing authority (UIDAI, GSTN, RBI, etc.).

Validators with checksums: **Aadhaar** (Verhoeff), **GSTIN** (mod-36 + state-code range). All others are format/syntax checks.

## Standalone checksum helpers

```ts
import { isAadhaarChecksumValid, isGstinChecksumValid } from 'ng-bharat-validators';

isAadhaarChecksumValid('234567890124')  // true
isGstinChecksumValid('27ABCDE1234F1Z0') // true
```

## Author

Sanket Jain

## License

MIT
