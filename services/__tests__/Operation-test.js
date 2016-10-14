import Operation from '../Operation';

describe('Operation', () => {
    it('stores values', () => {
        var op = new Operation(11, () => 22);
        expect(op.label).toEqual(11);
        expect(op.fn()).toEqual(22);
    });
});
