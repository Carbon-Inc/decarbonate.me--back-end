'use strict';

const debug = require('debug')('decarbonate:bearer-auth-middleware');
const createError = require('http-errors');

module.exports = function(req, res, next) {
  debug('#bearer-auth-middleware');

  let authHeaders = req.headers.authorization;
  if (!authHeaders) return next(createError(401, 'Authorization headers required'));

  let token = authHeaders.split('Bearer ')[1];
  if (!token) return next(createError(401, 'Token required'));

  
}
