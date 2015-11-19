import React from 'react';
import GameStore from '../stores/GameStore';
import debug from '../services/debug';

class Wait extends React.Component {
    static propTypes = {
        game: React.PropTypes.object.isRequired
    };

    getSecondsLeft() {
        if (this.props.game.nextRoundStartsAt) {
            return Math.round((this.props.game.nextRoundStartsAt.getTime() - new Date().getTime()) / 1000);
        } else {
            return 0;
        }
    }

    componentDidMount() {
        this.interval = setInterval(this.forceUpdate.bind(this), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        var iWon = this.props.game.payload.round.iWon;
        var iAlreadyAnswered = this.props.game.payload.round.iAlreadyAnswered;
        var roundCompleted = this.props.game.payload.round.completed;
        var iLost = !iWon && iAlreadyAnswered;

        return (
            <div>
                <div className="jumbotron game">
                    <h1>{iWon ? 'You are the winner!' : iLost ? 'Wrong answer :(' : 'Round completed'}</h1>

                    { roundCompleted ?
                        <p>Next round will start in {this.getSecondsLeft()} sec</p> :
                        <p>Please wait until round finishes</p> }
                </div>
            </div>
        );
    }
}

export default Wait;
