const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackConfig = require('../webpack.config.dev');
const users = require('./routes/users');
const auth = require('./routes/auth');
const database = require('./config/database');

const app = express();

database.connect();

app.use(bodyParser.json());

app.use('/api/users', users);
app.use('/api/auth', auth);

const compiler = webpack(webpackConfig);

app.use(webpackDevMiddleware(compiler, {
    hot: true,
    publicPath: webpackConfig.output.publicPath,
    noInfo: true
}));
app.use(webpackHotMiddleware(compiler));

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, './index.html'));
});

app.listen(3000, err => {
    if (err) {
        return console.error(err);
    }
    console.log('Listening at http://localhost:3000/');
});