import express from 'express';
import compression from 'compression';
import bodyParser from 'body-parser';
import path from 'path';
import serialize from 'serialize-javascript';
import {navigateAction} from 'fluxible-router';
import debugLib from 'debug';
import React from 'react';
import ReactDOM from 'react-dom/server';
import app from './app';
import HtmlComponent from './components/Html';
import { createElementWithContext } from 'fluxible-addons-react';
import { createServer } from 'http';
import createIo from 'socket.io';
import Game from './services/Game';
import roundAction from './actions/round';
import cookieSession from 'cookie-session';
import cookieParser from 'cookie-parser';

const env = process.env.NODE_ENV;

const debug = debugLib('fluxible-math');

const server = express();
server.set('trust proxy', 1);
server.use('/public', express.static(path.join(__dirname, '/public')));
server.use(cookieParser());
server.use((req, res, next) => {
    if (!req.cookies.session) {
        res.cookie('session', 'x' + Math.random(), {expires: new Date('2099-01-01'), httpOnly: true});
    }
    next();
});
server.use(compression());
server.use(bodyParser.json());

const httpServer = createServer(server);
const io = createIo(httpServer);
var game = new Game(io);

server.use((req, res, next) => {
    const context = app.createContext();

    context.executeAction(roundAction, game.getPayloadForPlayerIdent(req.cookies.session));

    debug('Executing navigate action');
    context.getActionContext().executeAction(navigateAction, {
        url: req.url
    }, (err) => {
        if (err) {
            if (err.statusCode && err.statusCode === 404) {
                // Pass through to next middleware
                next();
            } else {
                next(err);
            }
            return;
        }

        debug('Exposing context state');
        const exposed = 'window.App=' + serialize(app.dehydrate(context)) + ';';

        debug('Rendering Application component into html');
        const markup = ReactDOM.renderToString(createElementWithContext(context));
        const htmlElement = React.createElement(HtmlComponent, {
            clientFile: env === 'production' ? 'main.min.js' : 'main.js',
            context: context.getComponentContext(),
            state: exposed,
            markup: markup
        });
        const html = ReactDOM.renderToStaticMarkup(htmlElement);

        debug('Sending markup');
        res.type('html');
        res.write('<!DOCTYPE html>' + html);
        res.end();
    });
});

const port = process.env.PORT || 3000;
httpServer.listen(port);
console.log('Application listening on port ' + port);

export default server;
