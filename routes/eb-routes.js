'use strict';

const debug = require('debug')('decarbonate:eb-routes');
const superagent = require('superagent-bluebird-promise');
const ebController = require('../controllers/eb-controller');

const ebURL = 'https://www.eventbriteapi.com/v3';

module.exports = function(token) {
  debug('#ebRouter');
  return new Promise((resolve, reject) => {
    superagent.get(`${ebURL}/users/me/orders/?expand=event.venue,event.category,event.logo`)
    .set('Authorization', `Bearer ${token}`)
    .then(res => {
      return ebController.getEventInfo(res.text);
    })
    .then(events => resolve(events))
    .catch(err => reject(err));
  });
};
