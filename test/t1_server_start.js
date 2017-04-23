// set the env variable to test
process.env.NODE_ENV = 'test';

// require
const chai = require('chai'),
      chaiHttp = require('chai-http'),
      server = require('../server'),
      expect = chai.expect,
      request = require('superagent'),
      config = require('config');

describe('Server Start Up', () => {

    it('responds to GET on index url', (done) => {
        request
            .get('localhost:' + config.ngport + '/')
            .end((err, res) => {
                expect(res).to.exist;
                expect(res.status).to.equal(200);
                done();
            });
    });

    it('responds with 404 to fall through end points', (done) => {
        request
            .get('localhost:' + config.ngport + '/any')
            .end((err, res) => {
                expect(res).to.exist;
                expect(res.status).to.equal(404);
                done();
            });
    });

});