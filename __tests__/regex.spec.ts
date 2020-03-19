import * as fc from 'fast-check';

const contains = (pattern, text) => {return (new RegExp(pattern)).test(text)};

test('The concatenation of a, b and c always contains b', () => {
  fc.assert(
    fc.property(fc.hexaString(), fc.hexaString(), fc.hexaString(), (a, b, c) => {
      return contains(b, a + b + c);
    })
  );
});
test('Also works with expect', () => {
  fc.assert(
    fc.property(fc.hexaString(), fc.hexaString(), fc.hexaString(), (a, b, c) => {
      expect(contains(b, a + b + c)).toBe(true);
    })
  );
});
