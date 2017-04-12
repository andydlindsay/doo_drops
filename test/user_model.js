// set the env variable to test
process.env.NODE_ENV = 'test';

// imports
const mongoose = require('mongoose'),
      assert = require('assert'),
      User = require('../models/user');

describe('User Schema', () => {

    it('has a name field (required string, max length 55)', (done) => {
        let newUser = new User({});
        newUser.validate((err) => {
            // test if required
            assert.ok(err);
            assert.equal(err.errors['name'].kind, 'required');

            // test type (string)
            newUser.name = "Charlie Phelps";
            assert.equal(newUser.name, "Charlie Phelps");

            // test maxlength
            let fill = "nnnnn";
            while (newUser.name.length < 60) {
                newUser.name += fill;
            }
            newUser.validate((err) => {
                assert.ok(err);
                assert.equal(err.errors['name'].kind, 'maxlength');
                done();
            });
        });
    });

    it('has an email field (required string)', (done) => {
        let newUser = new User({});
        newUser.validate((err) => {
            // test if required
            assert.ok(err);
            assert.equal(err.errors['email'].kind, 'required');

            // test type (string)
            newUser.email = "charlie@danger.com";
            assert.equal(newUser.email, "charlie@danger.com");

            done();
        });
    });

    it('has a username field (required string)', (done) => {
        let newUser = new User({});
        newUser.validate((err) => {
            // test if required
            assert.ok(err);
            assert.equal(err.errors['username'].kind, 'required');

            // test type (string)
            newUser.username = "charlie281";
            assert.equal(newUser.username, "charlie281");
            done();
        });
    });

    it('has a password field (required string)', (done) => {
        let newUser = new User({});
        newUser.validate((err) => {
            // test if required
            assert.ok(err);
            assert.equal(err.errors['password'].kind, 'required');

            // test type (string)
            newUser.password = "secret";
            assert.equal(newUser.password, "secret");
            done();
        });
    });

});