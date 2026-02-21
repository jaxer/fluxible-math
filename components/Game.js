import React from 'react';
import answerAction from '../actions/answer';
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
        let roundId = this.props.game.payload.round.id;
        this.context.executeAction(answerAction, {answer: answer, roundId: roundId});
        track(`button-${answer}`);
    }

    render() {
        let roundId = this.props.game.payload.round.id;
        let c = this.props.game.payload.challenge;
        let isDisabled = this.props.game.isSubmittingAnswer();

        return (
            <div>
                <div className="jumbotron game">
                    <h1>{c.a} {c.op} {c.b} = ?</h1>

                    {c.answers.map(a =>
                    <a key={a} href={`/answer/${roundId}/${a}`} onClick={this.handleButton.bind(this, a)}
                       className="btn btn-success btn-lg"
                       disabled={isDisabled}>{a}</a>)}
                </div>
            </div>
        );
    }
}

export default Game;
