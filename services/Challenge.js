import Operation from './Operation';

function shuffle(array) {
    let count = array.length,
        randomNumber,
        temp;
    while (count) {
        randomNumber = Math.random() * count-- | 0;
        temp = array[count];
        array[count] = array[randomNumber];
        array[randomNumber] = temp;
    }
}

class Challenge {
    constructor() {
        this.a = Challenge.generateNumber();
        this.b = Challenge.generateNumber();
        this.op = Challenge.generateOperation();

        this.correctAnswer = this.op.fn(this.a, this.b);

        let getRandomAnswer = () => this.op.fn(Challenge.generateNumber(), Challenge.generateNumber());
        let getUniqueRandomAnswer = (existingAnswers) => {
            let a = getRandomAnswer();
            while (existingAnswers.includes(a)) {
                a = getRandomAnswer();
            }
            return a;
        };

        this.proposedAnswers = [this.correctAnswer];

        this.proposedAnswers.push(getUniqueRandomAnswer(this.proposedAnswers));
        this.proposedAnswers.push(getUniqueRandomAnswer(this.proposedAnswers));
        this.proposedAnswers.push(getUniqueRandomAnswer(this.proposedAnswers));

        shuffle(this.proposedAnswers);
    }

    static generateNumber() {
        return Math.floor(Math.random() * 10) + 1;
    }

    static generateOperation() {
        return [
            new Operation('+', (a, b) => a + b),
            new Operation('-', (a, b) => a - b),
            new Operation('\u00D7', (a, b) => a * b)
        ][Math.floor(Math.random() * 3)];
    }

    serialize() {
        return {
            a: this.a,
            b: this.b,
            op: this.op.label,
            answers: [...this.proposedAnswers]
        };
    }

    isCorrectAnswer(answer) {
        return Number(answer) === Number(this.correctAnswer);
    }
}

export default Challenge;
