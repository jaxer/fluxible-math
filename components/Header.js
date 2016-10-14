import React from 'react';

class Header extends React.Component {
    render() {
        let title = this.props.currentRoute.title || '...';
        return (
            <div className="header clearfix">
                <h3 className="text-muted">{title}</h3>
            </div>
        );
    }
}

export default Header;
