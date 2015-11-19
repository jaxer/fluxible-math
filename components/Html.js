import React from 'react';
import ApplicationStore from '../stores/ApplicationStore';

class Html extends React.Component {
    render() {
        return (
            <html>
            <head>
                <meta charSet="utf-8" />
                <title>{this.props.context.getStore(ApplicationStore).getPageTitle()}</title>
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css" />
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap-theme.min.css" />
                <link rel="stylesheet" href="/public/main.css" />
            </head>
            <body>
                <div id="app" className="container" dangerouslySetInnerHTML={{__html: this.props.markup}}></div>
                <script dangerouslySetInnerHTML={{__html: this.props.state}}></script>
                <script src={'/public/' + this.props.clientFile}></script>
            </body>
            </html>
        );
    }
}

export default Html;
