'use strict';

const debug = require('debug')('decarb: user-controller');
const User = require('../models/user');
const createError = require('http-errors');
const Promise = require('bluebird');

module.exports = exports = {};

exports.createUser = function(userData){
  debug('#createUser');
  if(!userData) return Promise.reject(createError(400, 'User data required.'));

  return new User(userData)
  .then(user => Promise.resolve(user))
  .catch(err => Promise.reject(createError(err.status, err.name)));
};

exports.fetchUser = function(evBUserId){
  debug('#fetchUser');
  if(!evBUserId) return Promise.reject(createError(400, 'EventBrite User Id required'));

  return User.find({userId: evBUserId})
  .then(user => Promise.resolve(user))
  .catch(err => Promise.reject(createError(err.status, err.name)));
};
