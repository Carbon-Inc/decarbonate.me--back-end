'use strict';

const debug = require('debug')('decarbonate:base-routes');
// const superagent = require('superagent-bluebird-promise');
// const urlParser = require('../lib/parse-url');
const ebRouter = require('./eb-routes');
const ebController = require('../controllers/eb-controller');
const bpRouter = require('./brighter-planet-routes');
// const CLIENT_KEY = process.env.CLIENT_KEY;
// const CLIENT_SECRET = process.env.CLIENT_SECRET;
let USER_ACCESS_TOKEN;

module.exports = function(router) {
  router.get('/token', (req, res) => {
    debug('#GET /decarbonate/token');
    USER_ACCESS_TOKEN = req.body;
    res.json(req.body);
    // USER_ACCESS_TOKEN = req.url.hash.split('token=')[1];
    // res.json(USER_ACCESS_TOKEN);
  });

  router.post('/events', (req, res) => {
    debug('#POST /decarbonate/events');
    return ebRouter(USER_ACCESS_TOKEN)
    .then(() => res.send())
    .catch(err => res.sendStatus(err.status));
  });

  router.get('/events', (req, res) => {
    debug('#GET /decarbonate/events');
    // return ebRouter(USER_ACCESS_TOKEN)
    // .then(() => {
    //   return ebController.fetchEvents();
    // })
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
