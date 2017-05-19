'use strict';

const debug = require('debug')('decarbonate:eb-controller');
const createError = require('http-errors');
const User = require('../models/user');
const Event = require('../models/event');

let eventIds = [];
module.exports = exports = {};

exports.createUser = function(body) {
  debug('#getUserInfo');
  body = JSON.parse(body);
  let userObj = {
    userId: body.id,
    name: body.name,
    email: body.emails[0].email,
  };
  return new User(userObj);
};

exports.createEvent = function(newEvent) {
  debug('#createEvent');
  return new Event(newEvent).save();
};

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
    for (let i = 0; i < eventsArr.length; i++) {
      let ev = {
        eventId: eventsArr[i].id,
        venueId: eventsArr[i].venue_id,
        logoId: eventsArr[i].logo_id,
        categoryId: eventsArr[i].category_id,
        name: eventsArr[i].category.name,
        start: eventsArr[i].start.local,
        end: eventsArr[i].end.local,
        description: eventsArr[i].description.text,
        address: eventsArr[i].venue.address.localized_address_display,
        img: eventsArr[i].logo.original.url,
        category: eventsArr[i].category.name,
        paid: false,
        transport: null,
      };
      exports.createEvent(ev)
      .then(eve => eventIds.push(eve._id))
      .catch(err => Promise.reject(err.message));
    }
    return Promise.resolve(eventIds);
  })
  .catch(err => Promise.reject(err.message));
};
