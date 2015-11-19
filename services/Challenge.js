class Challenge {
    constructor() {
        this.a = Challenge.generateNumber();
        this.b = Challenge.generateNumber();
        this.op = Challenge.generateOperation();

        this.correctAnswer = Challenge.calculateAnswer(this.a, this.b, this.op);
        var randomAnswer = Challenge.calculateAnswer(Challenge.generateNumber(),
            Challenge.generateNumber(), this.op);

        this.proposedAnswer = Math.random() < 0.5 ? randomAnswer : this.correctAnswer;
    }

    static calculateAnswer(a, b, op) {
        return eval(`${a}${op}${b}`); //eslint-disable-line no-eval
    }

    static generateNumber() {
        return Math.floor(Math.random() * 10) + 1;
    }

    static generateOperation() {
        return ['+', '-', '*', '/'][Math.floor(Math.random() * 4)];
    }

    serialize() {
        return {
            a: this.a,
            b: this.b,
            op: this.op,
            answer: this.proposedAnswer
        };
    }

    isCorrectAnswer(answer) {
        var shouldBe = this.correctAnswer === this.proposedAnswer ? 'yes' : 'no';
        return answer === shouldBe;
    }
}

export default Challenge;
