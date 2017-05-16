'use strict';

require('dotenv').load();

const express = require('express');
const cors = require('cors');
const debug = require('debug')('decarbonate:server');
const morgan = require('morgan');
const Promise = require('bluebird');
const bodyParser = require('body-parser').json();
const mongoose = require('mongoose');

const app = express();
const router = express.Router();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/decarbonate-env';

mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser);
app.use('/decarbonate', require('./routes/base-routes')(router));

const server = module.exports = app.listen(PORT, () => debug(`Listening on ${PORT}`));

server.isRunning = true;
