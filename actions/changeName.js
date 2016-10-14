export default function (context, payload, done) {
    context.dispatch('NAME_CHANGING');

    context.io.emit('name', payload, () => {
        context.dispatch('NAME_CHANGED');
    });

    done();
};
