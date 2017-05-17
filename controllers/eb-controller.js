'use strict';

const debug = require('debug')('decarbonate:eb-controller');
// const createError = require('http-errors');
const Event = require('../models/event');

module.exports = exports = {};

exports.getEventInfo = function(body) {
  debug('#getEventInfo');
  body = JSON.parse(body);
  let events = [];
  body.orders.forEach(ele => {
    let eventObj = {
      name: ele.event.name.text,
      description: ele.event.description.text,
      img: ele.event.logo.original.url,
      category: ele.event.category.name,
      start: ele.event.start.local,
      end: ele.event.end.local,
      address: ele.event.venue.address.localized_address_display,
      eventId: ele.event_id,
      venueId: ele.event.venue_id,
      logoId: ele.event.logo_id,
      categoryId: ele.event.category_id,
    };
    events.push(eventObj);
  });
  return Promise.resolve(events);
};

exports.createEvent = function(newEvents) {
  debug('#createEvent');
  newEvents.forEach(ele => {
    return new Event(ele).save();
  });
};

exports.fetchEvents = function() {
  debug('#fetchEvents');
  return Event.find({});
};
