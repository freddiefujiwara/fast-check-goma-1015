import * as fc from 'fast-check';
const contains = (pattern, text) => {return (new RegExp(pattern)).test(text)};

test('The concatenation of a, b and c always contains b', () => {
  fc.assert(
    fc.property(fc.hexaString(), fc.hexaString(), fc.hexaString(), (a:string, b:string, c:string) => {
      return contains(b, a + b + c);
    })
  );
});
test('Also works with expect', () => {
  fc.assert(
    fc.property(fc.hexaString(), fc.hexaString(), fc.hexaString(), (a:string, b:string, c:string) => {
      expect(contains(b, a + b + c)).toBe(true);
    })
  );
});
test('Also works with specific patterns', () => {
  fc.assert(
    fc.property(fc.fullUnicodeString(),(a:string)=> {
      expect(contains(/^A-z\. /, a)).toBe(false);
    }),{verbose: 3}
  );
});
