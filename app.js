import Fluxible from 'fluxible';
import Application from './components/Application';
import ApplicationStore from './stores/ApplicationStore';
import RouteStore from './stores/RouteStore';
import GameStore from './stores/GameStore';

// create new fluxible instance
const app = new Fluxible({
    component: Application
});

// register stores
app.registerStore(RouteStore);
app.registerStore(ApplicationStore);
app.registerStore(GameStore);

module.exports = app;
