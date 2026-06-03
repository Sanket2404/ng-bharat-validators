import { BharatValidators } from '../lib/validators.angular';

function ctrl(value: unknown) {
  return { value } as any;
}

describe('BharatValidators Angular — returns null for empty', () => {
  test('pan empty returns null', () => expect(BharatValidators.pan()(ctrl(''))).toBeNull());
  test('pan null returns null', () => expect(BharatValidators.pan()(ctrl(null))).toBeNull());
  test('mobile empty returns null', () => expect(BharatValidators.mobile()(ctrl(''))).toBeNull());
  test('gstin empty returns null', () => expect(BharatValidators.gstin()(ctrl(''))).toBeNull());
});

describe('BharatValidators Angular — returns null for valid input', () => {
  test('pan valid', () => expect(BharatValidators.pan()(ctrl('ABCDE1234F'))).toBeNull());
  test('aadhaar valid', () => expect(BharatValidators.aadhaar()(ctrl('234567890123'))).toBeNull());
  test('gstin valid', () => expect(BharatValidators.gstin()(ctrl('27ABCDE1234F1Z5'))).toBeNull());
  test('ifsc valid', () => expect(BharatValidators.ifsc()(ctrl('SBIN0005943'))).toBeNull());
  test('pincode valid', () => expect(BharatValidators.pincode()(ctrl('411001'))).toBeNull());
  test('mobile valid', () => expect(BharatValidators.mobile()(ctrl('9876543210'))).toBeNull());
  test('upi valid', () => expect(BharatValidators.upi()(ctrl('name@okicici'))).toBeNull());
});

describe('BharatValidators Angular — returns error object for invalid input', () => {
  test('pan error has message', () => {
    const result = BharatValidators.pan()(ctrl('INVALID'));
    expect(result).not.toBeNull();
    expect(result!['pan']).toBeDefined();
    expect(result!['pan'].message).toBeDefined();
    expect(typeof result!['pan'].message).toBe('string');
  });
  test('mobile error has message', () => {
    const result = BharatValidators.mobile()(ctrl('1234567890'));
    expect(result!['mobile'].message).toBeDefined();
  });
  test('gstin error has message', () => {
    const result = BharatValidators.gstin()(ctrl('INVALID'));
    expect(result!['gstin'].message).toBeDefined();
  });
  test('ifsc error has value', () => {
    const result = BharatValidators.ifsc()(ctrl('BADIFSC'));
    expect(result!['ifsc'].value).toBe('BADIFSC');
  });
});
