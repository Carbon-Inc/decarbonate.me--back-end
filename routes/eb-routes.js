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
        venueIds.push(newEvent.venueId);
        console.log(venueIds);
        console.log(newEvent);
        return ebController.createEvent(newEvent);
      })
      .then(eventObj => {
        venueIds.forEach(ele => {
          superagent.get(`${ebURL}/venues/${ele}`)
          .set('Authorization', `Bearer ${EB_ACCESS_TOKEN}`)
          .then(res => {
            debug('#GET /venues/:id');
            return ebController.getVenueInfo(res.text, eventObj._id);
          })
          .then(upEvent => {
            superagent.get(`${ebURL}/media/${upEvent.logoId}`)
            .set('Authorization', `Bearer ${EB_ACCESS_TOKEN}`)
            .then(res => ebController.getLogoInfo(res.text, upEvent._id))
            .catch(err => Promise.reject(err));
          })
          .then(data => {
            superagent.get(`${ebURL}/categories/${data.categoryId}`)
            .set('Authorization', `Bearer ${EB_ACCESS_TOKEN}`)
            .then(res => ebController.getCategoryInfo(res.text, data._id))
            .catch(err => Promise.reject(err));
          })
          .catch(err => Promise.reject(err));
        });
      })
      .catch(err => Promise.reject(err));
    });
    return ebController.fetchEvents();
  })
  // .then(eventObj => {
  //   venueIds.forEach(ele => {
  //     superagent.get(`${ebURL}/venues/${ele}`)
  //     .set('Authorization', `Bearer ${EB_ACCESS_TOKEN}`)
  //     .then(venue => {
  //       debug('#GET /venues/:id');
  //       return ebController.getVenueInfo(venue, eventObj.eventId);
  //     })
  //     .then(upEvent => {
  //       superagent.get(`${ebURL}/media/${upEvent.logo_id}`)
  //       .set('Authorization', `Bearer ${EB_ACCESS_TOKEN}`)
  //       .then(media => ebController.getLogoInfo(media, upEvent.eventId))
  //       .catch(err => Promise.reject(err));
  //     })
  //     .then(data => {
  //       superagent.get(`${ebURL}/categories/${data.category_id}`)
  //       .set('Authorization', `Bearer ${EB_ACCESS_TOKEN}`)
  //       .then(category => ebController.getCategoryInfo(category, data.eventId))
  //       .catch(err => Promise.reject(err));
  //     })
  //     .catch(err => Promise.reject(err));
  //   });
  //   return ebController.fetchEvents();
  // })
  .catch(err => Promise.reject(err));
};
