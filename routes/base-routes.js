'use strict';

const debug = require('debug')('decarbonate:base-routes');
const superagent = require('superagent-bluebird-promise');
const urlParser = require('../lib/parse-url');
const ebRouter = require('./eb-routes');
const ebController = require('../controllers/eb-controller');
const bpRouter = require('./brighter-planet-routes');
const CLIENT_KEY = process.env.CLIENT_KEY;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

module.exports = function(router) {
  router.post('/token/:code', urlParser, (req, res) => {
    debug('#POST /decarbonate/token/:code');
    console.log(req.params);
    superagent.post(`https://www.eventbrite.com/oauth/token?code=${req.params.code}&client_secret=${CLIENT_SECRET}&client_id=${CLIENT_KEY}&grant_type=authorization_code`)
    .set('Content-type', 'application/x-www-form-urlencoded')
    .then(data => {
      console.log(data);
      res.send(data);
    })
    .catch(err => res.sendStatus(err.status));
  });

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
