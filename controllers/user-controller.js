'use strict';

const debug = require('debug')('decarb: user-controller');
const User = require('../models/user');
const createError = require('http-errors');
const Promise = require('bluebird');
const mongoose = require('mongoose');

module.exports = exports = {};

exports.fetchUser = function(accCode){
  if(!accCode) return Promise.reject(createError(400, 'Access Code required.'));

  //send accCode to evBrite controller(orRoute)?
  //check returned oaToken against User model,
  //if user exists, <something>, else createUser?
  //return oaToken to route
};
