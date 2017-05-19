'use strict';

// const debug = require('debug')('decarb: user-model');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = Schema({
  userId: {type: String, required: true},
  name: {type: String, required: true},
  email: {type: String, required: true},
  oAuthToken: {type: String, required: true, default: null},
  events: [{type: Schema.Types.ObjectId, ref: 'event'}],
});

module.exports = mongoose.model('user', userSchema);
