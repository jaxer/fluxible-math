export default function (context, payload, done) {
    context.dispatch('ROUND', payload);
    done();
};
