import fc from 'fast-check';
import validate from '../src/password_validator';

describe('spec 01 : the passwords is required', () => {
    test('Passwords is required', () => {
        expect(validate(null)).toBe(false);
        expect(validate(undefined)).toBe(false);
        expect(validate("")).toBe(false);
    });
});
describe('spec 02 : the password should have a minimum of 8 characters and maximum of 20 characters', () => {
    test('Passwords which length is less than 8 should be rejected', () => {
        fc.assert(
            fc.property(fc.string(0,7),(password:string) => {
                ///   console.log(password);
                expect(validate(password)).toBe(false);
            })
        );
    });
    test('Passwords which length is more than 20 should be rejected', () => {
        fc.assert(
            fc.property(fc.string(21,100),(password:string) => {
                ///console.log(password);
                expect(validate(password)).toBe(false);
            })
        );
    });
});
