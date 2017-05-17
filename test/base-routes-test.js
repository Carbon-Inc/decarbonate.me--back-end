'use strict';

const debug = require('debug');
const chai = require('chai');
const expect = chai.expect;
const http = require('chai-http');
chai.use(http);
const superagent = require('superagent');
const mongoose = require('mongoose');
const server = require('../server');


describe('event-base-routes', function() {
  describe('#POST /decarbonate/events', function () {
    it('should return a 200 if given the proper route', done => {
      chai.request(server)
      .post('/decarbonate/events')
      .end((err, res) => {
        if(err) done(err);
        expect(res).to.have.property('status', 200);
        done();
      });
    });
    it('should return a 404 if given a bad route', done => {
      chai.request(server)
      .post('/decarbonate/badroute')
      .end((err, res) => {
        expect(res).to.have.property('status', 404);
        done();
      });
    });

  });
});
