// set the env variable to test
process.env.NODE_ENV = 'test';

// imports
const mongoose = require('mongoose'),
      assert = require('assert'),
      User = require('../models/user');

let newUser;

describe('User Schema', () => {

    before((done) => {

        // populate the newUser object with the basic keys
        newUser = new User({
            name: "",
            email: "",
            username: "",
            password: ""
        });

        done();
    });

    it('has a name field (required alphanumeric string, max length 55, min length 4)', (done) => {
        
        // field should be required
        newUser.name = "";
        let error = newUser.validateSync();
        assert.equal(error.errors['name'].message, 'name is a required field');

        // field should have a minimum length
        newUser.name = "Jay";
        error = newUser.validateSync();
        assert.equal(error.errors['name'].message, 'name must be at least 4 characters long');

        // field should not contain any special characters
        newUser.name = "?><!^&%*";
        error = newUser.validateSync();
        assert.equal(error.errors['name'].name, 'ValidatorError');

        // field should have a maximum length
        newUser.name = "";
        while (newUser.name.length < 60) {
            newUser.name += "nnnnn";
        }
        error = newUser.validateSync();
        assert.equal(error.errors['name'].message, 'name must be less than 55 characters');

        // field should accept a valid value
        newUser.name = "John Smith";
        error = newUser.validateSync();
        assert.equal(error.errors['name'], undefined);

        done();
    });

    it('has an email field (required string, valid email)', (done) => {

        // field should be required
        newUser.email = "";
        let error = newUser.validateSync();
        assert.equal(error.errors['email'].message, 'email is a required field');

        // field should be a valid email address
        newUser.email = "jsmith.gmail.com";
        error = newUser.validateSync();
        assert.equal(error.errors['email'].name, 'ValidatorError');

        // field should accept a valid value
        newUser.email = "jsmith@gmail.com";
        error = newUser.validateSync();
        assert.equal(error.errors['email'], undefined);

        done();
    });

    it('has a username field (unique required alphanumeric string, min length 8, max length 25, no spaces)', (done) => {

        // field should be required
        newUser.username = "";
        let error = newUser.validateSync();
        assert.equal(error.errors['username'].message, 'username is a required field');

        // field should not contain any special characters
        newUser.username = "jsmith!?&*";
        error = newUser.validateSync();
        assert.equal(error.errors['username'].name, 'ValidatorError');

        // field should have a minimum length
        newUser.username = "john";
        error = newUser.validateSync();
        assert.equal(error.errors['username'].message, 'username must be at least 8 characters long');

        // field should have a maximum length
        newUser.username = "";
        while (newUser.username.length < 30) {
            newUser.username += "nnnnn";
        }
        error = newUser.validateSync();
        assert.equal(error.errors['username'].message, 'username must be less than 25 characters long');

        // field should accept a valid value
        newUser.username = "johnsmith";
        error = newUser.validateSync();
        assert.equal(error.errors['username'], undefined);

        done();
    });

    it('has a password field (required string)', (done) => {
        
        // field should be required
        newUser.password = "";
        let error = newUser.validateSync();
        assert.equal(error.errors['password'].message, 'password is a required field');

        // field should accept a valid value
        newUser.password = "password";
        error = newUser.validateSync();
        assert.equal(error, undefined);
        
        done();
    });

});