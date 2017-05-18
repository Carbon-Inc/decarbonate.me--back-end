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
