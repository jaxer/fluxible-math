import React from 'react';

class Header extends React.Component {
    render() {
        var title = this.props.currentRoute.get('title') || '...';
        return (
            <div className="header clearfix">
                <h3 className="text-muted">{title}</h3>
            </div>
        );
    }
}

export default Header;
