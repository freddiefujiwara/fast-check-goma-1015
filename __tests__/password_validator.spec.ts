import fc from 'fast-check';
import validate from '../src/password_validator';

describe('spec 01 : the passwords is required', () => {
    test('Passwords is required', () => {
        expect(validate(null)).toBe(false);
        expect(validate(undefined)).toBe(false);
        expect(validate("")).toBe(false);
    });
});
