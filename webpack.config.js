const webpack = require('webpack');
const path = require('path');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
    mode: isProduction ? 'production' : 'development',
    resolve: {
        extensions: ['.js', '.jsx']
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
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: [
                    require.resolve('babel-loader')
                ]
            }
        ]
    },
    node: false,
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(isProduction ? 'production' : 'development')
            }
        })
    ],
    devtool: isProduction ? false : 'source-map'
};
