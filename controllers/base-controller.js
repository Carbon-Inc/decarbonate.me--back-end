'use strict';

const debug = require('debug')('decarbonate:eb-controller');
const Event = require('../models/event');

module.exports = exports = {};

exports.fetchAllEvents = function(){
  debug('#baseCtrl fetchAllEvents');

  return Event.find();
};
