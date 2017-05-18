'use strict';

const debug = require('debug')('decarbonate:base-routes');
const ebRouter = require('./eb-routes');
const bpRouter = require('./brighter-planet-routes');

let USER_ACCESS_TOKEN;

module.exports = function(router) {
  // router.post('/token', (req, res) => {
  //   debug('#GET /decarbonate/token');
  //   USER_ACCESS_TOKEN = req.body;
  //   res.json(req.body);
  // });

  router.post('/events', (req, res) => {
    debug('#GET /decarbonate/events');
    let USER_ACCESS_TOKEN = req.body;
    // return ebRouter('DGKS6UUHIPJAOSJRQVPD')
    return ebRouter(USER_ACCESS_TOKEN)
    .then(events => res.json(events))
    .catch(err => res.sendStatus(err.status));
  });

  router.get('/footprint/automobile/:startDate/:distance', (req,res) => {
    debug('#POST /decarbonate/footprint/automobile/:startDate/:distance');
    return bpRouter.carPrint(req.params.startDate, req.params.distance)
    .then(data => res.json(data))
    .catch(err => res.sendStatus(err.status));
  });

  router.get('/footprint/bus/:startDate/:distance', (req,res) => {
    debug('#POST /decarbonate/footprint/bus');
    return bpRouter.busPrint(req.params.startDate, req.params.distance)
    .then(data => res.json(data))
    .catch(err => res.sendStatus(err.status));
  });

  router.get('/footprint/plane/:startDate/:distance', (req,res) => {
    debug('#POST /decarbonate/footprint/plane');
    return bpRouter.planePrint(req.params.startDate, req.params.distance)
    .then(data => res.json(data))
    .catch(err => res.sendStatus(err.status));
  });

  return router;
};
