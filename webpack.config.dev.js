const path = require('path');
const webpack = require('webpack');

module.exports = {
    devtool: 'cheap-eval-source-map',
    entry: [
        'react-hot-loader/patch',
        'webpack-hot-middleware/client',
        './client/index.js'
    ],
    output: {
        path: '/',
        publicPath: '/',
        filename: 'bundle.js'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.NamedModulesPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                include: [
                    path.join(__dirname, 'client'),
                    path.join(__dirname, 'server/shared')
                ],
                exclude: /node_modules/,
                loader: 'babel-loader'
            }
        ]
    }
};