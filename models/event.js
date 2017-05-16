'use strict';

// const debug = require('debug')('decarb: event-model');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = Schema({
  eventId: {type: String, required: true},
  venueId: {type: String, required: true},
  logoId: {type: String, required: true},
  categoryId: {type: String, required: true},
  // userId: {type: String, required: true},
  name: {type: String, required: true},
  start: {type: Date, required: true},
  end: {type: Date, required: true},
  description: {type: String, required: true},
  address: {type: String, default: null},
  // originAddress: {type: String, default: null},
  // img: {type: String, required: true, default: null},
  category: {type: String, default: null},
  // carbonTonnes: {type: Number, default: null},
  // carbonPrice: {type: Number, default: null},
  paid: {type: Boolean, default: false},
  transport: {type: String, default: null},
});

module.exports = mongoose.model('event', eventSchema);
