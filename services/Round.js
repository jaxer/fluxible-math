class Round {
    constructor() {
        this.id = 'r' + Math.random();
        this.completed = false;
        this.answeredBy = {};
    }

    serialize(player) {
        var res = {
            id: this.id,
            completed: this.completed
        };

        if (player === this.winner) {
            res.iWon = true;
        }

        if (this.playerAlreadyAnswered(player)) {
            res.iAlreadyAnswered = true;
        }

        return res;
    }

    markWonBy(player) {
        this.completed = true;
        this.winner = player;
    }

    markTimedOut() {
        this.completed = true;
        this.winner = null;
    }

    markAnsweredBy(player) {
        this.answeredBy[player.ident] = true;
    }

    playerAlreadyAnswered(player) {
        return this.answeredBy[player.ident];
    }
}

export default Round;
