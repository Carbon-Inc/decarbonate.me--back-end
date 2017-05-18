'use strict';

const debug = require('debug')('decarbonate:base-routes');
// const bpCtrl = require('../controllers/brighter-planet-controller');
const superagent = require('superagent-bluebird-promise');

const key = '123abc';
const bpURL = 'http://impact.brighterplanet.com';

const distance = 1750; //get actuall from IOS, in (km)
let testDate = '2017-11-17';

function _FPandPrice(footprint, price){
  this.footprint = footprint,
  this.price = price;
}

let _hundredRound = function(val){
  return Math.round(val*100)/100;
};

let _pricePrint = function(footprint){
  debug('pricePrint');
  let tons = (footprint * 2.20462)/2000;
  let price = tons * 9.99;
  return _hundredRound(price);
};

module.exports = exports = {};

exports.carPrint = function(){
  debug('bpRoutes');
  return new Promise((resolve, reject) => {
    superagent.post(`${bpURL}/automobile_trips.json?key=${key}&date=${testDate/*req.body.event.start*/}&distance=${distance}`)
    .then(res => {
      let body = JSON.parse(res.text);
      let price = _pricePrint(body.decisions.carbon.object.value);
      let tons = (body.decisions.carbon.object.value * 2.20462);
      let footprint = _hundredRound(tons);
      let resObj = new _FPandPrice(footprint, price);
      console.log(`FP: ${footprint}lbs, Price: $${price}`);
      return resolve(resObj);
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
      let price = _pricePrint(body.decisions.carbon.object.value);
      let tons = (body.decisions.carbon.object.value * 2.20462);
      let footprint = _hundredRound(tons);
      let resObj = new _FPandPrice(footprint, price);
      console.log(`FP: ${footprint}lbs, Price: $${price}`);
      return resolve(resObj);
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
      let price = _pricePrint(body.decisions.carbon.object.value);
      let tons = (body.decisions.carbon.object.value * 2.20462);
      let footprint = _hundredRound(tons);
      let resObj = new _FPandPrice(footprint, price);
      console.log(`FP: ${footprint}lbs, Price: $${price}`);
      return resolve(resObj);
    })
    .catch(err => reject(err));
  });
};
