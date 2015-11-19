import debug from '../services/debug';

module.exports = function (context, payload, done) {
    context.dispatch('ROUND', payload);
    done();
};
