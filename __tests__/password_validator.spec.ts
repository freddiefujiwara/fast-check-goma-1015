import fc from 'fast-check';
import validate from '../src/password_validator';
const char = (charCodeFrom:integer,charCodeTo:integer) => fc.integer(charCodeFrom, charCodeTo).map(String.fromCharCode);
const filteredStrings = (min:integer,max:integer,filter:RegExp) => {
    return fc.array(char(33, //'!'
                         126 //'~'
                        ).filter(c => filter.test(c)),min,max).map(arr => arr.join(''));
}
const numberStrings = (min:integer,max:integer) => filteredStrings(8,20,/^[0-9]$/);
const alphabetStrings = (min:integer,max:integer) => filteredStrings(8,20,/^[a-zA-Z]$/);
const symbolStrings = (min:integer,max:integer) => filteredStrings(8,20,/^[^a-zA-Z0-9]$/);
const properString = (min:integer,max:integer) => { 
    return filteredStrings(8,20,/^[a-zA-Z0-9!"#$%&'()*+,.\-\/:;<=>?@\[\\\]^_`{|}~]$/).filter( s => {
        return !/^[0-9]{8,20}$/.test(s) && 
            !/^[a-zA-Z]{8,20}$/.test(s) && 
            !/^[!"#$%&'()*+,.\-\/:;<=>?@\[\\\]^_`{|}~]{8,20}$/.test(s);
    });
}

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
describe('spec 03 : the password should be mixed alphabets , numbers and printable symbols', () => {
    test('Passwords only consisting numbers{8,20} should be rejected', () => {
        fc.assert(
            fc.property(numberStrings(8,20),(password:string) => {
                //  console.log(password);
                expect(validate(password)).toBe(false);
            })
        );
    });
    test('Passwords only consisting alphabets{8,20} should be rejected', () => {
        fc.assert(
            fc.property(alphabetStrings(8,20),(password:string) => {
                //  console.log(password);
                expect(validate(password)).toBe(false);
            })
        );
    });
    test('Passwords only consisting printable symbols{8,20} should be rejected', () => {
        fc.assert(
            fc.property(symbolStrings(8,20),(password:string) => {
                //     console.log(password);
                expect(validate(password)).toBe(false);
            })
        );
    });
});
