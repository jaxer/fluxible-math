# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Multiplayer browser-based math game built with Fluxible (isomorphic React) and Socket.io for real-time communication. Players compete to answer arithmetic questions (addition, subtraction, multiplication) within timed rounds.

## Commands

- **Build**: `npm run build` (Webpack bundle to `public/main.js`)
- **Start server**: `npm start` (runs `start.js` which uses `@babel/register`)
- **Run all tests**: `npm test` (Jest)
- **Run single test**: `npx jest services/__tests__/Challenge-test.js`
- **Lint**: `npm run lint` (ESLint)

## Architecture

### Isomorphic Flux Pattern

The app uses Fluxible for isomorphic rendering — the same React components render on the server (Express in `server.js`) and rehydrate on the client (`client.js`). State is serialized (dehydrated) on the server and injected into the HTML, then rehydrated on the client.

- **App entry**: `app.js` — Fluxible app setup with stores and plugins
- **Server**: `server.js` — Express server with Socket.io, handles SSR and a fallback `GET /answer/:roundId/:answer` endpoint for clients without JS/WebSockets
- **Client**: `client.js` — Browser entry, rehydrates server state, connects Socket.io

### Data Flow

Actions (`actions/`) → dispatch to Stores (`stores/`) → render Components (`components/`).

- **GameStore**: holds current round payload and answer submission state
- **ApplicationStore**: page title metadata
- **RouteStore**: routing state (routes defined in `configs/routes.js`: `/` → Home, `/game` → Lobby)

Real-time events flow through the Socket.io plugin (`plugins/io.js`), which listens for `round` events from the server and dispatches them as Flux actions.

### Game Logic (services/)

- **Game.js**: Main coordinator — manages Socket.io connections, round rotation (15s play / 5s wait, configured in `configs/game.js`), player management, answer validation, and broadcasting state
- **Challenge.js**: Generates random math problems with 4 answer choices (1 correct, 3 random)
- **Round.js**: Tracks round ID, winner, and player answers
- **Player.js**: Player model with auto-incremented names and score tracking
- **Operation.js**: Math operation definitions (+, -, ×)

Players are cached in-memory on the server (keyed by session cookie). Scoring: +1 correct, -1 incorrect.

## Code Style

- 4-space indentation
- Single quotes
- ES6/ES7 syntax transpiled via Babel 7 (`@babel/preset-env`, `@babel/preset-react`)
- React 15 class components (no hooks)
