'use strict';

const debug = require('debug')('decarbonate:eb-controller');
// const createError = require('http-errors');
const Event = require('../models/event');

module.exports = exports = {};

exports.getEventIds = function(orders) {
  debug('#getEventIds');

  let eventIds = orders.orders.map(ele => ele.event_id);

  return Promise.resolve(eventIds);
};

exports.getEventInfo = function(event) {
  debug('#getEventInfo');

  let eventObj = {
    name: event.name.text,
    description: event.description.text,
    start: event.start.local,
    end: event.end.local,
    event_id: event.id,
    venue_id: event.venue_id,
    logo_id: event.logo_id,
    category_id: event.category_id,
  };
  return Promise.resolve(eventObj);
};

exports.getVenueInfo = function(venue, id) {
  debug('#getVenueInfo');

  return Event.findByIdAndUpdate(id, {address: venue.localized_address_display}, {new: true});
};

exports.getLogoInfo = function(media, id) {
  debug('#getLogoInfo');

  return Event.findByIdAndUpdate(id, {img: media.original.url}, {new: true});
};

exports.getCategoryInfo = function(category, id) {
  debug('#getCategoryInfo');

  return Event.findByIdAndUpdate(id, {category: category.name}, {new: true});
};

exports.createEvent = function(event) {
  debug('#createEvent');
  return new Event(event).save();
};

exports.fetchEvents = function() {
  debug('#fetchEvents');
  return Event.find({});
};
