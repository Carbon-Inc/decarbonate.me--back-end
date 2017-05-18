'use strict';

const debug = require('debug')('decarbonate:eb-controller');
const createError = require('http-errors');

const Event = function(eventObj) {
  this.name  =eventObj.name.text || 'not specified';
  this.description = eventObj.description.text || 'not specified';
  this.img = eventObj.logo.original.url || 'not specified';
  this.category = eventObj.category.name || 'not specified';
  this.start = eventObj.start.local || 'not specified';
  this.end = eventObj.end.local || 'not specified';
  this.address = eventObj.venue.address.localized_address_display || 'not specified';
  this.eventId = eventObj.id || 'not specified';
  this.venueId = eventObj.venue_id || 'not specified';
  this.logoId = eventObj.logo_id || 'not specified';
  this.categoryId = eventObj.category_id || 'not specified';
};

module.exports = exports = {};

exports.getEventInfo = function(body) {
  debug('#getEventInfo');
  body = JSON.parse(body);
  return new Promise((resolve, reject) => {
    let tempEvents = [];
    if (!body.orders) reject(createError(401, 'error'));
    body.orders.forEach(ele => {
      if (ele.event.online_event === false && ele.event.category_id !== null && ele.event.logo_id !== null) {
        tempEvents.push(ele.event);
      }
    });
    resolve(tempEvents);
  })
  .then(eventsArr => {
    let events = [];
    for (let i = 0; i < eventsArr.length; i++) {
      let newEvent = new Event(eventsArr[i]);
      events.push(newEvent);
    }
    return Promise.resolve(events);
  })
  .catch(err => Promise.reject(err.message));
};

exports.fetchEvents = function() {
  debug('#fetchEvents');
  return Event.find({});
};
