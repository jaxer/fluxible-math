import React from 'react';
import GameStore from '../stores/GameStore';
import debug from '../services/debug';
import answerAction from '../actions/answer';
import Scores from '../components/Scores';
import track from '../services/track';

class Game extends React.Component {
    static contextTypes = {
        executeAction: React.PropTypes.func.isRequired
    };

    static propTypes = {
        game: React.PropTypes.object.isRequired
    };

    handleButton(answer, e) {
        e.preventDefault();
        var roundId = this.props.game.payload.round.id;
        this.context.executeAction(answerAction, {answer: answer, roundId: roundId});
        track(`button-${answer}`);
    }

    static seemsInfiniteNumber(n) {
        return ('' + n).length > 10;
    }

    render() {
        var c = this.props.game.payload.challenge;
        var isDisabled = this.props.game.isSubmittingAnswer();
        var seemsInfinite = Game.seemsInfiniteNumber(c.answer);

        return (
            <div>
                <div className="jumbotron game">
                    <h1>{c.a} {c.op} {c.b} {seemsInfinite ? '\u2248' : '='} {
                        seemsInfinite ? c.answer.toFixed(6) : c.answer} ?</h1>

                    <a href="#" onClick={this.handleButton.bind(this, 'yes')}
                       className="btn btn-success btn-lg"
                       disabled={isDisabled}>YES</a>
                    <a href="#" onClick={this.handleButton.bind(this, 'no')}
                       className="btn btn-danger btn-lg"
                       disabled={isDisabled}>NO</a>
                </div>
            </div>
        );
    }
}

export default Game;
