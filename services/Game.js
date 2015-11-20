import Challenge from './Challenge';
import Round from './Round';
import Player from './Player';
import { roundTime, waitTime } from '../configs/game';
import debug from './debug';
import cookie from 'cookie';


class Game {
    constructor(io) {
        this.io = io;

        /**
         * Active players sockets.
         * Key is Player's ident.
         * @type {Object.<string, Socket>}
         */
        this.sockets = {};

        /**
         * Stores a cache of players ever seen. This is for demo purposes only.
         * Should be moved to redis or similar in production environments.
         * Key is Player's ident.
         * @type {Object.<string, Player>}
         */
        this.playersCache = {};

        this.rotateRound();

        this.io.on('connection', this.onConnection.bind(this));
    }

    onConnection(socket) {
        var playerIdent = cookie.parse(socket.request.headers.cookie).session;

        var player = this.getOrCreatePlayer(playerIdent);
        this.playersCache[playerIdent] = player;
        this.sockets[playerIdent] = socket;

        socket.on('answer', this.onAnswer.bind(this, player));
        socket.on('disconnect', this.onDisconnect.bind(this, player));

        this.emitPayloadToAll();
    }

    onDisconnect(player) {
        // TODO: periodically cleanup playersCache (i.e. based on last answer time)
        delete this.sockets[player.ident];
        this.emitPayloadToAll();
    }

    onAnswer(player, payload, fn) {
        if (payload.roundId === this.round.id && !this.round.completed && !this.round.playerAlreadyAnswered(player)) {
            if (this.challenge.isCorrectAnswer(payload.answer)) {
                player.score++;
                this.round.markWonBy(player);
                this.scheduleRound();
            } else {
                player.score--;
                this.round.markAnsweredBy(player);
                if(this.allAnswered()) {
                    this.stopRound();
                }
            }
        }
        fn(this.getPayload(player));
    }

    allAnswered() {
        return Object.keys(this.sockets).every((ident) => this.round.playerAlreadyAnswered(this.playersCache[ident]));
    }

    rotateRound() {
        this.generateRound();
        this.emitPayloadToAll();
        clearTimeout(this.timeout);
        this.timeout = setTimeout(this.stopRound.bind(this), roundTime);
    }

    emitPayloadToAll() {
        Object.keys(this.sockets).forEach(function (ident) {
            this.emitPayload(this.playersCache[ident]);
        }.bind(this));
    }

    stopRound() {
        this.round.markTimedOut();
        this.scheduleRound();
    }

    scheduleRound() {
        clearTimeout(this.timeout);
        this.timeout = setTimeout(this.rotateRound.bind(this), waitTime);
        this.nextRoundAt = new Date(new Date().getTime() + waitTime);
        this.emitPayloadToAll();
    }

    generateRound() {
        this.round = new Round();
        this.challenge = new Challenge();
    }

    getPayload(player) {
        return {
            round: this.round.serialize(player),
            nextRoundStartsInSecs: this.getSecsTillRoundStart(),
            challenge: this.challenge.serialize(),
            score: player.score,
            players: Object.keys(this.sockets).map((ident) => this.playersCache[ident]).
                sort((a, b) => a.score > b.score ? -1 : a.score < b.score ? 1 : 0).
                map((p) => {
                    var res = p.serialize();
                    if (p === player) {
                        res.me = true;
                    }
                    return res;
                })
        };
    }

    getPayloadForPlayerIdent(ident) {
        return this.getPayload(this.getOrCreatePlayer(ident));
    }

    emitPayload(player) {
        if (player.ident in this.sockets) {
            this.sockets[player.ident].emit('round', this.getPayload(player));
        } else {
            debug('tried to emit to already disconnected player');
        }
    }

    getOrCreatePlayer(playerIdent) {
        var player = this.playersCache[playerIdent];
        if (!player) {
            debug('creating player for ident', playerIdent);
            player = new Player(playerIdent);
        } else {
            debug('returnign chached player', playerIdent);
        }
        return player;
    }

    getSecsTillRoundStart() {
        return this.nextRoundAt ? Math.round((this.nextRoundAt.getTime() - new Date().getTime()) / 1000) : 0;
    }
}

export default Game;
