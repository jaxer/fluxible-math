import React from 'react';
import GameStore from '../stores/GameStore';
import debug from '../services/debug';
import connectToStores from 'fluxible-addons-react/connectToStores';

class Scores extends React.Component {
    static propTypes = {
        game: React.PropTypes.object.isRequired
    };

    render() {
        var players = this.props.game.payload.players;

        return (
            <div>
                <table className="table">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Score</th>
                    </tr>
                    </thead>
                    <tbody>
                    {players.map((p, i) => {
                        return <tr key={i} className={p.me ? 'warning' : ''}>
                            <td>{i + 1}</td>
                            <td>{p.me ? `Me (${p.name})` : p.name}</td>
                            <td>{p.score}</td>
                        </tr>;
                    })}
                    </tbody>
                </table>
            </div>
        );
    }
}

Scores = connectToStores(Scores, [GameStore], (context, props) => ({
    game: context.getStore(GameStore)
}));

export default Scores;
