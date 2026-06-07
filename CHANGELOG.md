# Changelog

All notable changes to this project are documented here.

## [1.0.2]

### Added
- **Aadhaar Verhoeff checksum** — `isValidAadhaar()` now verifies the 12th check
  digit, not just the "12 digits starting 2–9" shape. Made-up / mistyped numbers
  that previously passed are now correctly rejected.
- **GSTIN checksum** — `isValidGSTIN()` now verifies the 15th-character mod-36
  check digit per the GSTN specification.
- Exposed standalone helpers `isAadhaarChecksumValid()` and `isGstinChecksumValid()`.

### Changed (potentially breaking)
- **Angular validator errors no longer include the raw `value`.** Error objects
  are now `{ message }` only. This prevents sensitive PII (PAN, Aadhaar, etc.)
  from leaking into logs / error trackers when errors are serialised. If you read
  `control.errors?.['pan']?.value`, read it from the control instead
  (`control.value`).
- **Stricter Aadhaar/GSTIN validation** — inputs that only matched the format but
  failed the checksum will now return `false`. This is the intended behavior, but
  if you have test data with fake numbers, update it to checksum-valid values.
- GSTIN state-code range extended to include 38 (Ladakh).
- `MAX_INPUT_LENGTH` lowered from 500 to 100 (still well above any valid value;
  tighter ReDoS guard).

## [1.0.1]
- Initial public release with format validators for PAN, Aadhaar, GSTIN, IFSC,
  Pincode, Mobile, Vehicle number, Voter ID, Passport, UPI, Driving license.
