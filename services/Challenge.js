import Operation from './Operation';

class Challenge {
    constructor() {
        this.a = Challenge.generateNumber();
        this.b = Challenge.generateNumber();
        this.op = Challenge.generateOperation();

        this.correctAnswer = this.op.fn(this.a, this.b);
        var randomAnswer = this.op.fn(Challenge.generateNumber(), Challenge.generateNumber());

        this.proposedAnswer = Math.random() < 0.5 ? randomAnswer : this.correctAnswer;
    }

    static generateNumber() {
        return Math.floor(Math.random() * 10) + 1;
    }

    static generateOperation() {
        return [
            new Operation('+', (a, b) => a + b),
            new Operation('-', (a, b) => a - b),
            new Operation('\u00D7', (a, b) => a * b),
            new Operation('\u00F7', (a, b) => a / b)
        ][Math.floor(Math.random() * 4)];
    }

    serialize() {
        return {
            a: this.a,
            b: this.b,
            op: this.op.label,
            answer: this.proposedAnswer
        };
    }

    isCorrectAnswer(answer) {
        var shouldBe = this.correctAnswer === this.proposedAnswer ? 'yes' : 'no';
        return answer === shouldBe;
    }
}

export default Challenge;
