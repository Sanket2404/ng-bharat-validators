# ng-bharat-validators

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

BharatUtils.isValidPAN('ABCDE1234F')       // true
BharatUtils.isValidAadhaar('234567890123') // true
BharatUtils.isValidGSTIN('27ABCDE1234F1Z5') // true
BharatUtils.isValidIFSC('SBIN0005943')     // true
BharatUtils.isValidPincode('411001')       // true
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
- Every error includes a human-readable `message` property
- Handles lowercase, spaces, +91 prefix automatically
- Works in React, Vue, Node.js via `BharatUtils`
- Full TypeScript support with autocomplete
- Security tested against SQL injection and ReDoS attacks

## Author

Sanket Jain

## License

MIT
