import fc from 'fast-check';
import validate from '../src/password_validator';
const char = (charCodeFrom:integer,charCodeTo:integer) => fc.integer(charCodeFrom, charCodeTo).map(String.fromCharCode);
const filteredString = (min:integer,max:integer,filter:RegExp) => {
    return fc.array(char(33,  //'!'
                         126  //'~'
                        ).filter(c => filter.test(c)),min,max).map(arr => arr.join(''));
}
const numberString   = (min:integer,max:integer) => filteredString(8,20,/^[0-9]$/);
const alphabetString = (min:integer,max:integer) => filteredString(8,20,/^[a-zA-Z]$/);
const symbolString   = (min:integer,max:integer) => filteredString(8,20,/^[^a-zA-Z0-9]$/);
const properString   = (min:integer,max:integer) => { 
    return filteredString(8,20,/^[a-zA-Z0-9!"#$%&'()*+,.\-\/:;<=>?@\[\\\]^_`{|}~]$/).filter( s => {
        return !/^[0-9]{8,20}$/.test(s) && 
        !/^[a-zA-Z]{8,20}$/.test(s) && 
        !/^[!"#$%&'()*+,.\-\/:;<=>?@\[\\\]^_`{|}~]{8,20}$/.test(s);
    });
}

test('Strings which length is less than 8 should be rejected', () => {
    fc.assert(
        fc.property(fc.string(7),(password:string) => {
            ///            console.log(password);
            expect(validate(password)).toBe(false);
        })
    );
});
test('Strings which length is more than 20 should be rejected', () => {
    fc.assert(
        fc.property(fc.string(21,100),(password:string) => {
            ///console.log(password);
            expect(validate(password)).toBe(false);
        })
    );
});
test('Strings only consisting numbers{8,20} should be rejected', () => {
    fc.assert(
        fc.property(numberString(8,20),(password:string) => {
            //      console.log(password);
            expect(validate(password)).toBe(false);
        })
    );
});
test('Strings only consisting alphabets{8,20} should be rejected', () => {
    fc.assert(
        fc.property(alphabetString(8,20),(password:string) => {
            //      console.log(password);
            expect(validate(password)).toBe(false);
        })
    );
});
test('Strings only consisting printable symbols{8,20} should be rejected', () => {
    fc.assert(
        fc.property(symbolString(8,20),(password:string) => {
//                  console.log(password);
            expect(validate(password)).toBe(false);
        })
    );
});
test('Strings only consisting proper characters{8,20} should be accepted', () => {
    fc.assert(
        fc.property(properString(8,20),(password:string) => {
//            console.log(password);
            expect(validate(password)).toBe(true);
        })
    );
});
