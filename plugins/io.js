import debug from '../services/debug';
import socket from 'socket.io-client';
import roundAction from '../actions/round';

class IoPlugin {
    constructor() {
        this.io = socket();
        this.name = 'IoPlugin';
    }

    plugContext(options, context, app) {
        this.io.on('round', (payload) => {
            context.executeAction(roundAction, payload);
        });

        return {
            plugComponentContext: function (componentContext) {
                componentContext.io = this.io;
            }.bind(this),

            plugActionContext: function (actionContext) {
                actionContext.io = this.io;
            }.bind(this)
        };
    }
}

export default IoPlugin;
