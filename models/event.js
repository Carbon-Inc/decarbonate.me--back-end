'use strict';

const debug = require('debug')('decarb: event-model');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = Schema({
  eventId: {type: String, required: true},
  userId: {type: String, required: true},
  dcUserId: {type: Schema.Types.ObjectId, required: true},
  name: {type: String, required: true},
  start: {type: Date, required: true},
  end: {type: Date, required: true},
  description: {type: String, required: true},
  eventAddress: {type: String, required: true},
  originAddress: {type: String, default: null},
  img: {type: String, required: true},
  category: {type: String, required: true},
  carbonTonnes: {type: Number, default: null},
  carbonPrice: {type: Number, default: null},
  paid: {type: Boolean, default: false},
  transport: {type: String, default: null},
});

module.exports = mongoose.model('event', eventSchema);
