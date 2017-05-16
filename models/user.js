'use strict';

const debug = require('debug')('decarb: user-model');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = Schema({
  userId: {type: String, required: true},
  oAuthToken: {type: String, required: true},
});

module.exports = mongoose.model('user', userSchema);
