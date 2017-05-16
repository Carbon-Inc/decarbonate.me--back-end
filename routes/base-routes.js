'use strict';

const debug = require('debug')('decarbonate:base-routes');
// const createError = require('http-errors');
const ebRouter = require('./eb-routes');

module.exports = function(router) {
  router.post('/events', (req, res) => {
    debug('#POST /decarbonate/events');
    return ebRouter()
    .then(events => res.json(events))
    .catch(err => res.sendStatus(err.status));
  });

  return router;
};
