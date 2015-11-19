import React from 'react';
import GameStore from '../stores/GameStore';
import debug from '../services/debug';
import connectToStores from 'fluxible-addons-react/connectToStores';
import answerAction from '../actions/answer';
import Game from './Game';
import Wait from './Wait';
import Scores from './Scores';

class Lobby extends React.Component {
    static propTypes = {
        game: React.PropTypes.object.isRequired
    };

    render() {
        var round = this.props.game.payload.round;
        var isInGame = !round.completed && !round.iAlreadyAnswered;

        return (
            <div>
                { isInGame ? <Game game={this.props.game}/> : <Wait game={this.props.game}/> }
                <Scores />
            </div>
        );
    }
}

Lobby = connectToStores(Lobby, [GameStore], (context, props) => ({
    game: context.getStore(GameStore)
}));

export default Lobby;
