// set the env variable to test
process.env.NODE_ENV = 'test';

// require
const chai = require('chai'),
      expect = chai.expect,
      request = require('superagent'),
      mongoose = require('mongoose'),
      Doodrop = require('../models/doodrop'),
      assert = require('assert'),
      url = 'localhost:' + process.env.PORT + '/';

let newDoodrop;

describe('Doodrop API', () => {

    before ((done) => {

        // empty the test database 'doodrops' collection
        Doodrop.remove({}, (err) => {
            assert.ifError(err);
        });

        // create a couple of doodrops
        const doodrops = [{
            loc: {
                lng: 45.23501,
                lat: -27.45652
            },
            doo: true,
            gender: 'female',
            breed: 'Golden Retriever',
            age: 720,
            neutered: false
        }, {
            loc: {
                lng: 67.23445,
                lat: 89.00235
            },
            doo: false,
            gender: 'male',
            breed: 'Golden Retriever',
            age: 1720,
            neutered: true
        }, {
            loc: {
                lng: 145.23354,
                lat: -7.45652
            },
            doo: false,
            gender: 'female',
            breed: 'Dachshund',
            age: 345,
            neutered: false
        }];

        // insert into collection
        Doodrop.create(doodrops, (err) => {
            assert.ifError(err);
        });

        done();
    });

    it('returns a count of all doodrops in the collection', (done) => {
        request
            .get(url + 'api/doodrops/count')
            .end((err, res) => {
                expect(res).to.exist;
                expect(res.body.count).to.equal(3);
                done();
            });
    });

});