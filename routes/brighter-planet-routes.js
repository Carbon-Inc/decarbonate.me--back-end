'use strict';

const debug = require('debug')('decarbonate:base-routes');
// const bpCtrl = require('../controllers/brighter-planet-controller');
const superagent = require('superagent-bluebird-promise');

const key = '123abc';
const bpURL = 'http://impact.brighterplanet.com';

const distance = 100; //get actuall from IOS, in (km)
let testDate = '2017-11-17';

module.exports = exports = {};

exports.carPrint = function(){
  debug('bpRoutes');
  return new Promise((resolve, reject) => {
    superagent.post(`${bpURL}/automobile_trips.json?key=${key}&date=${testDate/*req.body.event.start*/}&distance=${distance}`)
    .then(res => {
      let body = JSON.parse(res.text);
      console.log(body.decisions.carbon.object.value);
      return resolve(body.decisions.carbon.object.value);
    })
    .catch(err => reject(err));
  });
};

exports.busPrint = function(){
  debug('bpRoutes');
  return new Promise((resolve, reject) => {
    superagent.post(`${bpURL}/bus_trips.json?key=${key}&date=${testDate/*req.body.event.start*/}&distance=${distance}`)
    .then(res => {
      let body = JSON.parse(res.text);
      console.log(body.decisions.carbon.object.value);
      return resolve(body.decisions.carbon.object.value);
    })
    .catch(err => reject(err));
  });
};

exports.planePrint = function(){
  debug('bpRoutes');
  return new Promise((resolve, reject) => {
    superagent.post(`${bpURL}/flights.json?key=${key}&date=${testDate/*req.body.event.start*/}&distance=${distance}`)
    .then(res => {
      let body = JSON.parse(res.text);
      console.log(body.decisions.carbon.object.value);
      return resolve(body.decisions.carbon.object.value);
    })
    .catch(err => reject(err));
  });
};

// module.exports = function(/*req*/){
//   debug('bpRoutes');
//   return new Promise((resolve, reject) => {
//     superagent.post(`${bpURL}/automobile_trips.json?key=${key}&date=${testDate/*req.body.event.start*/}&distance=${distance}`)
//     .then(res => {
//       let body = JSON.parse(res.text);
//       console.log(body.decisions.carbon.object.value);
//       return resolve(body.decisions.carbon.object.value);
//     })
//     .catch(err => reject(err));
//   });
//
// };
