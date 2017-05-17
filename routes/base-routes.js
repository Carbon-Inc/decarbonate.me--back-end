'use strict';

const debug = require('debug')('decarbonate:base-routes');
const ebRouter = require('./eb-routes');
const ebController = require('../controllers/eb-controller');

module.exports = function(router) {
  router.post('/events', (req, res) => {
    debug('#POST /decarbonate/events');
    return ebRouter()
    .then(() => res.send())
    .catch(err => res.sendStatus(err.status));
  });

  router.get('/events', (req, res) => {
    debug('#GET /decarbonate/events');
    return ebController.fetchEvents()
    .then(events => res.json(events))
    .catch(err => res.sendStatus(err.status));
  });

  return router;
};
