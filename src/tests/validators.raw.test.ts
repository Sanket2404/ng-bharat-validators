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
} from '../lib/validators.raw';

describe('PAN Validator', () => {
  test('valid PAN uppercase', () => expect(isValidPAN('ABCDE1234F')).toBe(true));
  test('valid PAN lowercase', () => expect(isValidPAN('abcde1234f')).toBe(true));
  test('valid PAN mixed case', () => expect(isValidPAN('AbCdE1234f')).toBe(true));
  test('valid PAN with spaces', () => expect(isValidPAN(' ABCDE1234F ')).toBe(true));
  test('invalid PAN too short', () => expect(isValidPAN('ABCDE123F')).toBe(false));
  test('invalid PAN ends with digit', () => expect(isValidPAN('ABCDE12345')).toBe(false));
  test('invalid PAN starts with digit', () => expect(isValidPAN('1BCDE1234F')).toBe(false));
  test('invalid PAN empty', () => expect(isValidPAN('')).toBe(false));
  test('invalid PAN null', () => expect(isValidPAN(null)).toBe(false));
  test('invalid PAN undefined', () => expect(isValidPAN(undefined)).toBe(false));
  test('invalid PAN sql injection', () => expect(isValidPAN("'; DROP TABLE users; --")).toBe(false));
  test('invalid PAN too long', () => expect(isValidPAN('A'.repeat(501))).toBe(false));
});

describe('Aadhaar Validator', () => {
  // 234567890124 carries a valid Verhoeff check digit.
  test('valid Aadhaar', () => expect(isValidAadhaar('234567890124')).toBe(true));
  test('valid Aadhaar with spaces', () => expect(isValidAadhaar('2345 6789 0124')).toBe(true));
  test('valid Aadhaar with hyphens', () => expect(isValidAadhaar('2345-6789-0124')).toBe(true));
  test('invalid Aadhaar bad checksum', () => expect(isValidAadhaar('234567890123')).toBe(false));
  test('invalid Aadhaar starts with 0', () => expect(isValidAadhaar('012345678901')).toBe(false));
  test('invalid Aadhaar starts with 1', () => expect(isValidAadhaar('123456789012')).toBe(false));
  test('invalid Aadhaar 11 digits', () => expect(isValidAadhaar('23456789012')).toBe(false));
  test('invalid Aadhaar 13 digits', () => expect(isValidAadhaar('2345678901234')).toBe(false));
  test('invalid Aadhaar empty', () => expect(isValidAadhaar('')).toBe(false));
  test('invalid Aadhaar null', () => expect(isValidAadhaar(null)).toBe(false));
});

describe('GSTIN Validator', () => {
  // 27ABCDE1234F1Z0 / 29GGGGG0000G1ZG carry valid mod-36 check digits.
  test('valid GSTIN Maharashtra', () => expect(isValidGSTIN('27ABCDE1234F1Z0')).toBe(true));
  test('valid GSTIN Karnataka', () => expect(isValidGSTIN('29GGGGG0000G1ZG')).toBe(true));
  test('valid GSTIN lowercase', () => expect(isValidGSTIN('27abcde1234f1z0')).toBe(true));
  test('invalid GSTIN bad checksum', () => expect(isValidGSTIN('27ABCDE1234F1Z5')).toBe(false));
  test('invalid GSTIN state code 99', () => expect(isValidGSTIN('99ABCDE1234F1Z5')).toBe(false));
  test('invalid GSTIN state code 00', () => expect(isValidGSTIN('00ABCDE1234F1Z5')).toBe(false));
  test('invalid GSTIN missing Z', () => expect(isValidGSTIN('27ABCDE1234F1A5')).toBe(false));
  test('invalid GSTIN too short', () => expect(isValidGSTIN('27ABCDE1234F')).toBe(false));
  test('invalid GSTIN empty', () => expect(isValidGSTIN('')).toBe(false));
  test('invalid GSTIN null', () => expect(isValidGSTIN(null)).toBe(false));
});

describe('IFSC Validator', () => {
  test('valid IFSC SBI', () => expect(isValidIFSC('SBIN0005943')).toBe(true));
  test('valid IFSC HDFC', () => expect(isValidIFSC('HDFC0000001')).toBe(true));
  test('valid IFSC lowercase', () => expect(isValidIFSC('sbin0005943')).toBe(true));
  test('invalid IFSC 5th char not zero', () => expect(isValidIFSC('SBIN1005943')).toBe(false));
  test('invalid IFSC only 3 letter bank', () => expect(isValidIFSC('SBI00059431')).toBe(false));
  test('invalid IFSC too short', () => expect(isValidIFSC('SBIN000594')).toBe(false));
  test('invalid IFSC empty', () => expect(isValidIFSC('')).toBe(false));
  test('invalid IFSC null', () => expect(isValidIFSC(null)).toBe(false));
});

describe('Pincode Validator', () => {
  test('valid Pune pincode', () => expect(isValidPincode('411001')).toBe(true));
  test('valid Mumbai pincode', () => expect(isValidPincode('400001')).toBe(true));
  test('valid pincode as number', () => expect(isValidPincode(411001)).toBe(true));
  test('invalid pincode starts with 0', () => expect(isValidPincode('011001')).toBe(false));
  test('invalid pincode 5 digits', () => expect(isValidPincode('41100')).toBe(false));
  test('invalid pincode 7 digits', () => expect(isValidPincode('4110011')).toBe(false));
  test('invalid pincode empty', () => expect(isValidPincode('')).toBe(false));
  test('invalid pincode null', () => expect(isValidPincode(null)).toBe(false));
});

describe('Mobile Validator', () => {
  test('valid mobile 10 digits', () => expect(isValidIndianMobile('9876543210')).toBe(true));
  test('valid mobile starts with 6', () => expect(isValidIndianMobile('6876543210')).toBe(true));
  test('valid mobile with +91', () => expect(isValidIndianMobile('+919876543210')).toBe(true));
  test('valid mobile with 91', () => expect(isValidIndianMobile('919876543210')).toBe(true));
  test('valid mobile with 0', () => expect(isValidIndianMobile('09876543210')).toBe(true));
  test('valid mobile with space', () => expect(isValidIndianMobile('98765 43210')).toBe(true));
  test('invalid mobile starts with 5', () => expect(isValidIndianMobile('5876543210')).toBe(false));
  test('invalid mobile starts with 1', () => expect(isValidIndianMobile('1876543210')).toBe(false));
  test('invalid mobile 9 digits', () => expect(isValidIndianMobile('987654321')).toBe(false));
  test('invalid mobile empty', () => expect(isValidIndianMobile('')).toBe(false));
  test('invalid mobile null', () => expect(isValidIndianMobile(null)).toBe(false));
});

describe('Vehicle Number Validator', () => {
  test('valid MH vehicle', () => expect(isValidVehicleNumber('MH12AB1234')).toBe(true));
  test('valid DL vehicle', () => expect(isValidVehicleNumber('DL4CAF0001')).toBe(true));
  test('valid lowercase', () => expect(isValidVehicleNumber('mh12ab1234')).toBe(true));
  test('valid with spaces', () => expect(isValidVehicleNumber('MH 12 AB 1234')).toBe(true));
  test('invalid starts with digit', () => expect(isValidVehicleNumber('12ABCD1234')).toBe(false));
  test('invalid empty', () => expect(isValidVehicleNumber('')).toBe(false));
  test('invalid null', () => expect(isValidVehicleNumber(null)).toBe(false));
});

describe('Voter ID Validator', () => {
  test('valid voter ID', () => expect(isValidVoterID('ABC1234567')).toBe(true));
  test('valid lowercase', () => expect(isValidVoterID('abc1234567')).toBe(true));
  test('invalid only 2 letters', () => expect(isValidVoterID('AB1234567')).toBe(false));
  test('invalid only 6 digits', () => expect(isValidVoterID('ABC123456')).toBe(false));
  test('invalid empty', () => expect(isValidVoterID('')).toBe(false));
  test('invalid null', () => expect(isValidVoterID(null)).toBe(false));
});

describe('Passport Validator', () => {
  test('valid passport', () => expect(isValidPassport('A1234567')).toBe(true));
  test('valid lowercase', () => expect(isValidPassport('a1234567')).toBe(true));
  test('invalid starts with digit', () => expect(isValidPassport('01234567')).toBe(false));
  test('invalid too short', () => expect(isValidPassport('A123456')).toBe(false));
  test('invalid too long', () => expect(isValidPassport('A123456789')).toBe(false));
  test('invalid empty', () => expect(isValidPassport('')).toBe(false));
  test('invalid null', () => expect(isValidPassport(null)).toBe(false));
});

describe('UPI Validator', () => {
  test('valid UPI ICICI', () => expect(isValidUPI('name@okicici')).toBe(true));
  test('valid UPI Paytm', () => expect(isValidUPI('9876543210@paytm')).toBe(true));
  test('valid UPI with dot', () => expect(isValidUPI('user.name@ybl')).toBe(true));
  test('valid UPI with hyphen', () => expect(isValidUPI('user-name@upi')).toBe(true));
  test('invalid UPI no @', () => expect(isValidUPI('justtext')).toBe(false));
  test('invalid UPI empty prefix', () => expect(isValidUPI('@noprefix')).toBe(false));
  test('invalid UPI empty suffix', () => expect(isValidUPI('name@')).toBe(false));
  test('invalid UPI empty', () => expect(isValidUPI('')).toBe(false));
  test('invalid UPI null', () => expect(isValidUPI(null)).toBe(false));
});

describe('Driving License Validator', () => {
  test('valid DL without hyphen', () => expect(isValidDrivingLicense('MH1420110012345')).toBe(true));
  test('valid DL with hyphen', () => expect(isValidDrivingLicense('MH-1420110012345')).toBe(true));
  test('valid DL lowercase', () => expect(isValidDrivingLicense('mh1420110012345')).toBe(true));
  test('invalid DL too short', () => expect(isValidDrivingLicense('MH14201')).toBe(false));
  test('invalid DL empty', () => expect(isValidDrivingLicense('')).toBe(false));
  test('invalid DL null', () => expect(isValidDrivingLicense(null)).toBe(false));
});
