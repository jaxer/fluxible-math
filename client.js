/*global document, window */

import 'babel-polyfill';
import FastClick from 'fastclick';
import ReactDOM from 'react-dom';
import React from 'react';
import debug from './services/debug';
import { createElementWithContext } from 'fluxible-addons-react';
import app from './app';
import roundAction from './actions/round';
import IoPlugin from './plugins/io';
import track from './services/track';

const dehydratedState = window.App; // Sent from the server

window.React = ReactDOM; // For chrome dev tool support

window.addEventListener('load', () => {
    FastClick.attach(document.body);
});

app.plug(new IoPlugin());

// pass in the dehydrated server state from server.js
app.rehydrate(dehydratedState, (err, context) => {
    if (err) {
        throw err;
    }
    window.context = context;
    const mountNode = document.getElementById('app');

    ReactDOM.render(
        createElementWithContext(context),
        mountNode
    );
});

track('load');
