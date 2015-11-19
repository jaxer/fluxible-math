import debug from '../services/debug';

module.exports = function (context, payload, done) {
    context.dispatch('ANSWER_SUBMITTING');

    context.io.emit('answer', payload, function (roundPayload) {
        context.dispatch('ANSWER_SUBMITTED');
        context.dispatch('ROUND', roundPayload);
    });

    done();
};
