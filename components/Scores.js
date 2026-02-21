import React from 'react';
import GameStore from '../stores/GameStore';
import connectToStores from 'fluxible-addons-react/connectToStores';
import changeNameAction from '../actions/changeName';

class Scores extends React.Component {
    static contextTypes = {
        executeAction: React.PropTypes.func.isRequired
    };

    static propTypes = {
        game: React.PropTypes.object.isRequired
    };

    handleEdit(player, e) {
        e.preventDefault();
        let newName = prompt('Enter name', player.name);
        this.context.executeAction(changeNameAction, newName);
    }

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
                                <td>{p.me ? `Me (${p.name})` : p.name}
                                    {p.me ? <a href="#" onClick={this.handleEdit.bind(this, p)} className="edit">
                                    change name</a> : null}</td>
                                <td>{p.score}</td>
                            </tr>;
                        })}
                    </tbody>
                </table>
            </div>
        );
    }
}

Scores = connectToStores(Scores, [GameStore], (context, _props) => ({
    game: context.getStore(GameStore)
}));

export default Scores;
