'use strict';

const debug = require('debug')('decarbonate:eb-routes');
const superagent = require('superagent-bluebird-promise');
const ebController = require('../controllers/eb-controller');

const ebURL = 'https://www.eventbriteapi.com/v3';
const EB_ACCESS_TOKEN = process.env.EB_ACCESS_TOKEN;

module.exports = function() {
  return new Promise((resolve, reject) => {
    superagent.get(`${ebURL}/users/me/orders`)
    .set('Authorization', `Bearer ${EB_ACCESS_TOKEN}`)
    .then(res => {
      debug('#GET /users/me/orders');
      return ebController.getEventIds(res.text);
    })
    .then(eventIds => {
      eventIds.forEach(ele => {
        debug('#GET /events/:id');
        superagent.get(`${ebURL}/events/${ele}`)
        .set('Authorization', `Bearer ${EB_ACCESS_TOKEN}`)
        .then(res => {
          return ebController.getEventInfo(res.text);
        })
        .then(newEvent => {
          return ebController.createEvent(newEvent);
        })
        .then(eventObj => {
          debug('#GET /venues/:id');
          superagent.get(`${ebURL}/venues/${eventObj.venueId}`)
          .set('Authorization', `Bearer ${EB_ACCESS_TOKEN}`)
          .then(res => {
            return ebController.getVenueInfo(res.text, eventObj._id);
          })
          .then(() => {
            debug('#GET /media/:id');
            superagent.get(`${ebURL}/media/${eventObj.logoId}`)
            .set('Authorization', `Bearer ${EB_ACCESS_TOKEN}`)
            .then(res => {
              return ebController.getLogoInfo(res.text, eventObj._id);
            })
            .then(() => {
              debug('#GET /categories/:id');
              superagent.get(`${ebURL}/categories/${eventObj.categoryId}`)
              .set('Authorization', `Bearer ${EB_ACCESS_TOKEN}`)
              .then(res => {
                return ebController.getCategoryInfo(res.text, eventObj._id);
              })
              .then(() => {
                return ebController.fetchEvents();
              })
              .then(events => resolve(events))
              .catch(err => reject(err));
            })
            .catch(err => reject(err));
          })
          .catch(err => reject(err));
        })
        .catch(err => reject(err));
      });
    })
    .catch(err => reject(err));
  });
};
