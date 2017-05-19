'use strict';

const debug = require('debug');
const chai = require('chai');
const expect = chai.expect;
const superagent = require('superagent');
const mongoose = require('mongoose');
const Event = require('../models/event');


const testEvent = {
  eventId: '17778521035',
  name: 'Test Event Name',
  start: '2017-05-17T21:01:39Z',
  end: '2017-05-17T21:05:10Z',
  description: 'This is a test event description',
  address: '1234 1st Ave, Seattle, WA 98111',
  img: 'https://img.evbuc.com/123104u2035u20',
  category: 'Music',
  paid: false,
  transport: 'car',
};

describe('event-model-test', function () {
  describe('when creating a new event object', function () {
    let newEvent = new Event(testEvent);
    it('should have these expected properties', done => {
      expect(newEvent.eventId).to.equal('17778521035');
      expect(newEvent.name).to.equal('Test Event Name');
      expect(newEvent.start).to.be.a('date');
      expect(newEvent.end).to.be.a('date');
      expect(newEvent.description).to.equal('This is a test event description');
      expect(newEvent.address).to.equal('1234 1st Ave, Seattle, WA 98111');
      expect(newEvent.img).to.equal('https://img.evbuc.com/123104u2035u20');
      expect(newEvent.paid).to.equal(false);
      expect(newEvent.transport).to.equal('car');
      done();
    });
  });
});

const testConEvent = {
  name: {text: 'Test Name'},
  description: {text: 'This is a test description'},
  logo: {original: {url: 'http://url.com'}},
  category: {name: 'test category'},
  start: {local: '2017-05-18'},
  end: {local: '2017-05-18'},
  venue: {address: {localized_address_display:'1235 1st Ave, Seattle, WA'}},
  id: '43234',
  venue_id: '1223',
  logo_id: '79094',
  category_id: '12351',
  paid: false,
};

const NewEvent = function(eventObj) {
  this.name  =eventObj.name.text;
  this.description = eventObj.description.text;
  this.img = eventObj.logo.original.url;
  this.category = eventObj.category.name;
  this.start = eventObj.start.local;
  this.end = eventObj.end.local;
  this.address = eventObj.venue.address.localized_address_display;
  this.eventId = eventObj.id;
  this.venueId = eventObj.venue_id;
  this.logoId = eventObj.logo_id;
  this.categoryId = eventObj.category_id;
  this.paid = false;
};

describe('event-model-constructor', function () {
  describe('when creating a new event object', function () {
    let newEventCon = new NewEvent(testConEvent);
    it('should have these expected properties', done => {
      expect(newEventCon.name).to.equal('Test Name');
      expect(newEventCon.description).to.equal('This is a test description');
      expect(newEventCon.img).to.equal('http://url.com');
      expect(newEventCon.category).to.equal('test category');
      expect(newEventCon.start).to.equal('2017-05-18');
      expect(newEventCon.end).to.equal('2017-05-18');
      expect(newEventCon.address).to.equal('1235 1st Ave, Seattle, WA');
      expect(newEventCon.eventId).to.equal('43234');
      expect(newEventCon.venueId).to.equal('1223');
      expect(newEventCon.logoId).to.equal('79094');
      expect(newEventCon.categoryId).to.equal('12351');
      expect(newEventCon.paid).to.equal(false);
      done();
    });
  });
});
