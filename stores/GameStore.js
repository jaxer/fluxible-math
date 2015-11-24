import BaseStore from 'fluxible/addons/BaseStore';
import debug from '../services/debug';

class GameStore extends BaseStore {
    constructor(dispatcher) {
        super(dispatcher);
        this.payload = {};
        this.submittingAnswer = false;
    }

    dehydrate() {
        return {
            payload: this.payload,
            nextRoundStartsAt: this.nextRoundStartsAt
        };
    }

    rehydrate(state) {
        this.payload = state.payload;
        this.nextRoundStartsAt = state.nextRoundStartsAt;
    }

    handleRound(payload) {
        debug('ROUND: ', payload);
        this.payload = payload;
        if (this.payload.nextRoundStartsInSecs) {
            this.nextRoundStartsAt = new Date(new Date().getTime() + this.payload.nextRoundStartsInSecs * 1000);
        }
        this.emitChange();
    }

    handleAnswerSubmitting() {
        this.submittingAnswer = true;
        this.emitChange();
    }

    handleAnswerSubmitted() {
        this.submittingAnswer = false;
        this.emitChange();
    }

    isSubmittingAnswer() {
        return this.submittingAnswer;
    }
}

GameStore.storeName = 'GameStore';
GameStore.handlers = {
    'ROUND': 'handleRound',
    'ANSWER_SUBMITTED': 'handleAnswerSubmitted',
    'ANSWER_SUBMITTING': 'handleAnswerSubmitting'
};

export default GameStore;
