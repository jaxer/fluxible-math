import React from 'react';
import { NavLink } from 'fluxible-router';

class Home extends React.Component {
    render() {
        return (
            <div className="jumbotron">
                <h1>Get Ready</h1>
                <p>Multiplayer game where fastest calculator wins.</p>
                <p>Ready for some challenges? Click Start!</p>
                <p>
                    <NavLink href="/game" className="btn btn-primary btn-lg">Start</NavLink>
                </p>
            </div>
        );
    }
}

export default Home;
