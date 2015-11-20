jest.dontMock('../Operation');

var Operation = require('../Operation');

describe('Operation', () => {
    it('stores values', () => {
        var op = new Operation(11, () => 22);
        expect(op.label).toEqual(11);
        expect(op.fn()).toEqual(22);
    });
});
