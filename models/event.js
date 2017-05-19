'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = Schema({
  eventId: {type: String, required: true, default: null},
  venueId: {type: String, required: true, default: null},
  logoId: {type: String, required: true, default: null},
  categoryId: {type: String, required: true, default: null},
  name: {type: String, required: true, default: null},
  start: {type: Date, required: true, default: null},
  end: {type: Date, required: true, default: null},
  description: {type: String, required: true, default: null},
  address: {type: String, default: null},
  img: {type: String, default: null},
  category: {type: String, default: null},
  paid: {type: Boolean, default: false},
  transport: {type: String, default: null},
});

module.exports = mongoose.model('event', eventSchema);
