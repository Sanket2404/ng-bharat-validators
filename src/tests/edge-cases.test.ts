import {
  isValidPAN,
  isValidAadhaar,
  isValidGSTIN,
  isValidIFSC,
  isValidIndianMobile,
} from '../lib/validators.raw';

describe('Security — malicious inputs never throw, always return false', () => {
  const attacks = [
    "'; DROP TABLE users; --",
    '<script>alert(1)</script>',
    '../../../etc/passwd',
    'A'.repeat(10000),
    '\x00\x01\x02',
    '   ',
    '{}',
    '[]',
    'null',
    'undefined',
    '0',
  ];

  test.each(attacks)('PAN rejects: %s', (val) => {
    expect(() => isValidPAN(val)).not.toThrow();
    expect(isValidPAN(val)).toBe(false);
  });

  test.each(attacks)('Aadhaar rejects: %s', (val) => {
    expect(() => isValidAadhaar(val)).not.toThrow();
    expect(isValidAadhaar(val)).toBe(false);
  });

  test.each(attacks)('GSTIN rejects: %s', (val) => {
    expect(() => isValidGSTIN(val)).not.toThrow();
    expect(isValidGSTIN(val)).toBe(false);
  });

  test.each(attacks)('IFSC rejects: %s', (val) => {
    expect(() => isValidIFSC(val)).not.toThrow();
    expect(isValidIFSC(val)).toBe(false);
  });

  test.each(attacks)('Mobile rejects: %s', (val) => {
    expect(() => isValidIndianMobile(val)).not.toThrow();
    expect(isValidIndianMobile(val)).toBe(false);
  });
});

describe('Edge cases — weird but real inputs', () => {
  test('PAN with number input returns false', () => expect(isValidPAN(12345)).toBe(false));
  test('PAN with object returns false', () => expect(isValidPAN({})).toBe(false));
  test('PAN with array returns false', () => expect(isValidPAN([])).toBe(false));
  test('PAN with boolean returns false', () => expect(isValidPAN(true)).toBe(false));
  test('Mobile with float returns false', () => expect(isValidIndianMobile(9.876543210)).toBe(false));
});
