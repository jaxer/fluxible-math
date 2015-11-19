var nextPlayerId = 1;

class Player {
    constructor(ident, socket) {
        this.name = `Player ${nextPlayerId++}`;
        this.ident = ident;
        this.score = 0;
        this.socket = socket;
    }

    serialize() {
        return {
            name: this.name,
            score: this.score
        };
    }
}

export default Player;
