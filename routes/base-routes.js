'use strict';

const debug = require('debug')('decarbonate:base-routes');
const ebRouter = require('./eb-routes');
const bpRouter = require('./brighter-planet-routes');

let USER_ACCESS_TOKEN;

module.exports = function(router) {
  router.get('/token', (req, res) => {
    debug('#GET /decarbonate/token');
    USER_ACCESS_TOKEN = req.body;
    res.json(req.body);
  });

  router.get('/events', (req, res) => {
    debug('#GET /decarbonate/events');
    return ebRouter(USER_ACCESS_TOKEN)
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
