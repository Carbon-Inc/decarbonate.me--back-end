'use strict';

const debug = require('debug')('decarbonate:base-routes');
const ebRouter = require('./eb-routes');
const ebController = require('../controllers/eb-controller');
const bpRouter = require('./brighter-planet-routes');

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

  router.post('/footprint/automobile', (req,res) => {
    debug('#POST /decarbonate/footprint/automobile');
    return bpRouter.carPrint()
    .then(data => res.json(data))
    .catch(err => res.sendStatus(err.status));
  });

  router.post('/footprint/bus', (req,res) => {
    debug('#POST /decarbonate/footprint/bus');
    return bpRouter.busPrint()
    .then(data => res.json(data))
    .catch(err => res.sendStatus(err.status));
  });

  router.post('/footprint/plane', (req,res) => {
    debug('#POST /decarbonate/footprint/plane');
    return bpRouter.planePrint()
    .then(data => res.json(data))
    .catch(err => res.sendStatus(err.status));
  });
  return router;
};
