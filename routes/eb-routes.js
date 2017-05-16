'use strict';

const debug = require('debug')('decarbonate:eb-routes');
const superagent = require('superagent-bluebird-promise');
const ebController = require('../controllers/eb-controller');
const ebURL = 'https://www.eventbriteapi.com/v3';
const EB_ACCESS_TOKEN = process.env.EB_ACCESS_TOKEN;

module.exports = function() {
  let venueIds = [];
  superagent.get(`${ebURL}/users/me/orders`)
  .set('Authorization', `Bearer ${EB_ACCESS_TOKEN}`)
  .then(orders => {
    debug('#GET /users/me/orders');
    return ebController.getEventIds(orders);
  })
  .then(eventIds => {
    eventIds.forEach(ele => {
      superagent.get(`${ebURL}/events/${ele}`)
      .set('Authorization', `Bearer ${EB_ACCESS_TOKEN}`)
      .then(event => {
        debug('#GET /events/:id');
        return ebController.getEventInfo(event);
      })
      .then(event => {
        venueIds.push(event.venue_id);
        return ebController.createEvent(event);
      })
      .catch(err => Promise.reject(err));
    });
  })
  .then(eventObj => {
    venueIds.forEach(ele => {
      superagent.get(`${ebURL}/venues/${ele}`)
      .set('Authorization', `Bearer ${EB_ACCESS_TOKEN}`)
      .then(venue => {
        debug('#GET /venues/:id');
        return ebController.getVenueInfo(venue, eventObj.event_id);
      })
      .then(upEvent => {
        superagent.get(`${ebURL}/media/${upEvent.logo_id}`)
        .set('Authorization', `Bearer ${EB_ACCESS_TOKEN}`)
        .then(media => ebController.getLogoInfo(media, upEvent.event_id))
        .catch(err => Promise.reject(err));
      })
      .then(data => {
        superagent.get(`${ebURL}/categories/${data.category_id}`)
        .set('Authorization', `Bearer ${EB_ACCESS_TOKEN}`)
        .then(category => ebController.getCategoryInfo(category, data.event_id))
        .catch(err => Promise.reject(err));
      })
      .catch(err => Promise.reject(err));
    });
    return ebController.fetchEvents();
  })
  .catch(err => Promise.reject(err));
};
