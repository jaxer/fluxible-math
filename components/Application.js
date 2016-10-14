import React from 'react';
import ApplicationStore from '../stores/ApplicationStore';
import {connectToStores, provideContext} from 'fluxible-addons-react';
import {handleHistory} from 'fluxible-router';
import Header from './Header';
import Footer from './Footer';

class Application extends React.Component {
    render() {
        let Handler = this.props.currentRoute.handler.default;

        return (
            <div>
                <Header currentRoute={this.props.currentRoute}/>
                <Handler />
                <Footer />
            </div>
        );
    }

    componentDidUpdate(prevProps) {
        const newProps = this.props;
        if (newProps.pageTitle === prevProps.pageTitle) {
            return;
        }
        document.title = newProps.pageTitle;
    }
}

export default provideContext(handleHistory(connectToStores(
    Application,
    [ApplicationStore],
    function (context) {
        let appStore = context.getStore(ApplicationStore);
        return {
            pageTitle: appStore.getPageTitle()
        };
    }
)));
