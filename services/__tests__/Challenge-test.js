jest.dontMock('../Challenge');
jest.dontMock('../Operation');

var Challenge = require('../Challenge');
var Operation = require('../Operation');

describe('Challenge', () => {
    it('serializes', () => {
        var c = new Challenge();
        c.a = 3;
        c.b = 5;
        c.op = new Operation('+', (a, b) => a);
        c.proposedAnswer = 10;
        expect(c.serialize()).toEqual({
            a: 3,
            answer: 10,
            b: 5,
            op: '+'
        });
    });
});
