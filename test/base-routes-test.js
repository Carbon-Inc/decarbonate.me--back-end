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
        expect(res).to.have.status(200);
        done();
      });
    });
    it('should return a 404 if given a bad route', done => {
      chai.request(server)
      .post('/decarbonate/badroute')
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
    });

  });

  describe('#GET /decarbonate/events', function(){
    it('should return 200 if given the proper route', done => {
      chai.request(server)
      .get('/decarbonate/events')
      .end((err, res) => {
        if(err) done(err);
        expect(res).to.have.status(200);
        done();
      });
    });
    it('should return 404 if given bad route', done => {
      chai.request(server)
      .get('/decarbonate/badroute')
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
    });
  });

  describe('#POST /footprint/automobile', function(){
    it('should return 404 on bad route', done => {
      chai.request(server)
      .post('/decarbonate/footprint/badroute')
      .set('testDate', '01-01-2018')
      .set('distance', 100)
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
    });
    it('should return 200 on proper request', done => {
      chai.request(server)
      .post('/decarbonate/footprint/automobile')
      .set('testDate', '01-01-2018')
      .set('distance', 100)
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
    });
    it('should return 400 on bad request', done => {
      chai.request(server)
      .post('/decarbonate/footprint/automobile')
      .set('testDate', null)
      .set('distance', 100)
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
    });
  });

  describe('#POST /footprint/bus', function(){
    it('should return 404 on bad route', done => {
      chai.request(server)
      .post('/decarbonate/footprint/badroute')
      .set('testDate', '01-01-2018')
      .set('distance', 100)
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
    });
    it('should return 200 on proper request', done => {
      chai.request(server)
      .post('/decarbonate/footprint/bus')
      .set('testDate', '01-01-2018')
      .set('distance', 100)
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
    });
    it('should return 400 on bad request', done => {
      chai.request(server)
      .post('/decarbonate/footprint/bus')
      .set('testDate', null)
      .set('distance', 100)
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
    });
  });

  describe('#POST /footprint/plane', function(){
    it('should return 404 on bad route', done => {
      chai.request(server)
      .post('/decarbonate/footprint/badroute')
      .set('testDate', '01-01-2018')
      .set('distance', 100)
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
    });
    it('should return 200 on proper request', done => {
      chai.request(server)
      .post('/decarbonate/footprint/plane')
      .set('testDate', '01-01-2018')
      .set('distance', 200)
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
    });
    it('should return 400 on bad request', done => {
      chai.request(server)
      .post('/decarbonate/footprint/plane')
      .set('testDate', null)
      .set('distance', 100)
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
    });
  });

});
