const express = require('express');
const config = require('config');
const logger = require('./lib/logger');
const path = require('path');
const favicon = require('serve-favicon');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

const app = module.exports = express();

const web = require('./routes/web');
const api = require('./routes/api');
const common = require('./routes/common');
const error = require('./routes/error');

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// General app setup
app.use(favicon(path.join(__dirname, 'public', 'favicon.png')));
app.use(morgan(config.morgan.format, { stream: logger.stream }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.locals.config = config;

// Routes setup
app.use(common);
app.use(api);
app.use(web);

// Error handler
app.use(error);
