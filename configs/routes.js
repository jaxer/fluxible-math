export default {
    home: {
        path: '/',
        method: 'get',
        page: 'home',
        title: 'The Math Game',
        handler: require('../components/Home')
    },
    game: {
        path: '/game',
        method: 'get',
        page: 'game',
        title: 'The Math Game',
        handler: require('../components/Lobby')
    }
};
