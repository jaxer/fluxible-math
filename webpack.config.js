let webpack = require('webpack');
let path = require('path');

let webpackConfig = {
    resolve: {
        extensions: ['', '.js']
    },
    entry: [
        './client.js'
    ],
    output: {
        path: path.resolve('./public'),
        publicPath: '/public',
        filename: 'main.js'
    },
    module: {
        loaders: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loaders: [
                    require.resolve('babel-loader')
                ]
            },
            { test: /\.json$/, loader: 'json-loader'}
        ]
    },
    node: {
        setImmediate: false
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ],
    devtool: 'inline-source-map'
};

module.exports = webpackConfig;
