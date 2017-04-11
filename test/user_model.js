// set the env variable to test
process.env.NODE_ENV = 'test';

// imports
const mongoose = require('mongoose'),
      assert = require('assert'),
      User = require('../models/user');

describe('User Schema', () => {

    it('has a name field (required string, max length 55, validated)');

    it('has an email field (required string, validated)');

    it('has a username field (require string, unique, validated)');

    it('has a password field (required string)');

});