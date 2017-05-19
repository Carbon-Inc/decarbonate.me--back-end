'use strict';

const debug = require('debug')('decarbonate:eb-routes');
const superagent = require('superagent-bluebird-promise');
const ebController = require('../controllers/eb-controller');
const User = require('../models/user');
const Event = require('../models/event');

const ebURL = 'https://www.eventbriteapi.com/v3';

module.exports = function(token) {
  debug('#ebRouter');
  return new Promise((resolve, reject) => {
    superagent.get(`${ebURL}/users/me`)
    .set('Authorization', `Bearer ${token}`)
    .then(res => {
      return ebController.createUser(res.text);
    })
    .then(user => {
      user.oAuthToken = token;
      return User.findOne({oAuthToken: token})
      .then(usr => {
        if (usr) {
          return Event.find({})
          .then(data => {
            return resolve(data);
          })
          .catch(err => reject(err));
        }
        return user.save();
      })
      .catch(err => reject(err));
    })
    .then(() => {
      superagent.get(`${ebURL}/users/me/orders/?expand=event.venue,event.category,event.logo`)
      .set('Authorization', `Bearer ${token}`)
      .then(res => {
        return ebController.getEventInfo(res.text);
      })
      .then(eveIds => {
        return User.findOne({oAuthToken: token})
        .then(user => {
          eveIds.forEach(el => user.events.push(el));
          user.save();
        })
        .catch(err => reject(err));
      })
      .then(() => Event.find({}))
      .then(events => resolve(events))
      .catch(err => reject(err));
    })
    .catch(err => reject(err));
  });
};
