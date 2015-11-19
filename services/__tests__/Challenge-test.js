jest.dontMock('../Challenge');

var Challenge = require('../Challenge');

describe('Challenge', () => {
    it('calculates correct answer', () => {
        expect(Challenge.calculateAnswer(1, 3, '*')).toEqual(3);
        expect(Challenge.calculateAnswer(8, 3, '-')).toEqual(5);
        expect(Challenge.calculateAnswer(9, 3, '/')).toEqual(3);
        expect(Challenge.calculateAnswer(1, 3, '+')).toEqual(4);
    });

    it('serializes', () => {
        var c = new Challenge();
        c.a = 3;
        c.b = 5;
        c.op = '+';
        c.proposedAnswer = 10;
        expect(c.serialize()).toEqual({
            a: 3,
            answer: 10,
            b: 5,
            op: '+'
        });
    });
});
