'use strict';

const debug = require('debug')('decarbonate:eb-controller');
// const createError = require('http-errors');
const Event = require('../models/event');

module.exports = exports = {};

exports.getEventIds = function(body) {
  debug('#getEventIds');
  body = JSON.parse(body);
  let orders = body.orders;
  let eventIds = orders.map(ele => ele.event_id);
  console.log(eventIds);

  return Promise.resolve(eventIds);
};

exports.getEventInfo = function(event) {
  debug('#getEventInfo');

  event = JSON.parse(event);
  let eventObj = {
    name: event.name.text,
    description: event.description.text,
    start: event.start.local,
    end: event.end.local,
    eventId: event.id,
    venueId: event.venue_id,
    logoId: event.logo_id,
    categoryId: event.category_id,
  };
  return Promise.resolve(eventObj);
};

exports.getVenueInfo = function(venue, id) {
  debug('#getVenueInfo');
  venue = JSON.parse(venue);
  return Event.findByIdAndUpdate(id, {address: venue.localized_address_display}, {new: true});
};

exports.getLogoInfo = function(media, id) {
  debug('#getLogoInfo');
  media = JSON.parse(media);
  return Event.findByIdAndUpdate(id, {img: media.original.url}, {new: true});
};

exports.getCategoryInfo = function(category, id) {
  debug('#getCategoryInfo');
  category = JSON.parse(category);
  return Event.findByIdAndUpdate(id, {category: category.name}, {new: true});
};

exports.createEvent = function(newEvent) {
  debug('#createEvent');
  return new Event(newEvent).save();
};

exports.fetchEvents = function() {
  debug('#fetchEvents');
  return Event.find({});
};
