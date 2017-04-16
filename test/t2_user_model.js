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

    describe('Dog Schema', () => {

        before((done) => {

            // populate the newUser.dog object with the basic keys
            newUser.dogs.push({
                name: "",
                dob: new Date('1/1/1970'),
                image: "",
                gender: "",
                breed: ""
            });

            done();
        });

        it('has a name field (required alphanumeric string, max length 25)', (done) => {
            
            // field should be required
            newUser.dogs[0].name = "";
            let error = newUser.validateSync();
            assert.equal(error.errors['dogs.0.name'].message, 'dog name is a required field');

            // field should not contain any special characters
            newUser.dogs[0].name = "?!$%&*(#";
            error = newUser.validateSync();
            assert.equal(error.errors['dogs.0.name'].name, 'ValidatorError');

            // field should have a maximum length
            newUser.dogs[0].name = "";
            while (newUser.dogs[0].name.length < 30) {
                newUser.dogs[0].name += "nnnnn";
            }
            error = newUser.validateSync();
            assert.equal(error.errors['dogs.0.name'].message, 'dog name must be less than 26 characters');

            // field should accept a valid value
            newUser.dogs[0].name = "Goldie";
            error = newUser.validateSync();
            assert.equal(error.errors['dogs.0.name'], undefined);
            
            done();
        });

        it('has a dob field (date, must be earlier than current date)', (done) => {

            // field should accept dates only
            newUser.dogs[0].dob = "yesterday";
            let error = newUser.validateSync();
            assert.equal(error.errors['dogs.0.dob'].name, 'CastError');

            // value cannot be greater than current date
            newUser.dogs[0].dob = new Date('2/14/2018');
            error = newUser.validateSync();
            assert.equal(error.errors['dogs.0.dob'].message, 'date of birth must be in the past');

            // field should accept a valid value
            newUser.dogs[0].dob = new Date('6/30/2010');
            error = newUser.validateSync();
            assert.equal(error.errors['dogs.0.dob'], undefined);

            done();
        });

        it('has an image field (string, must be a url)', (done) => {

            // value must be a url containing http:// or https://
            newUser.dogs[0].image = "dog.jpg";
            let error = newUser.validateSync();
            assert.equal(error.errors['dogs.0.image'].name, 'ValidatorError');

            // field should accept a valid value
            newUser.dogs[0].image = "https://www.amazons3.com/images/dog.jpg";
            error = newUser.validateSync();
            assert.equal(error.errors['dogs.0.image'], undefined);

            done();
        });

        it('has a gender field (string, enum \'male\' or \'female\')', (done) => {

            // value must be either 'male' or 'female'
            newUser.dogs[0].gender = "monkey";
            let error = newUser.validateSync();
            assert.equal(error.errors['dogs.0.gender'].name, 'ValidatorError');

            // field should accept a valid value - 'male'
            newUser.dogs[0].gender = "male";
            error = newUser.validateSync();
            assert.equal(error.errors['dogs.0.gender'], undefined);

            // field should accept a valid value - 'female'
            newUser.dogs[0].gender = "female";
            error = newUser.validateSync();
            assert.equal(error.errors['dogs.0.gender'], undefined);

            done();
        });

        it('has a neutered field (boolean)', (done) => {

            // field should accept a valid value - false
            newUser.dogs[0].neutered = false;
            let error = newUser.validateSync();
            assert.equal(error.errors['dogs.0.neutered'], undefined);
            
            // field should accept a valid value - true
            newUser.dogs[0].neutered = true;
            error = newUser.validateSync();
            assert.equal(error.errors['dogs.0.neutered'], undefined);

            done();
        });

        it('has a breed field (alphabetic string, max length 25)', (done) => {

            // field should not accept numbers
            newUser.dogs[0].breed = "24704";
            let error = newUser.validateSync();
            assert.equal(error.errors['dogs.0.breed'].name, 'ValidatorError');

            // field should not contain any special characters
            newUser.dogs[0].breed = '?<>&*@#';
            error = newUser.validateSync();
            assert.equal(error.errors['dogs.0.breed'].name, 'ValidatorError');

            // field should have a maximum length
            newUser.dogs[0].breed = "";
            while (newUser.dogs[0].breed.length < 35) {
                newUser.dogs[0].breed += "nnnnn";
            }
            error = newUser.validateSync();
            assert.equal(error.errors['dogs.0.breed'].message, 'dog breed must be less than 26 characters');

            // field should accept a valid value
            newUser.dogs[0].breed = "Lab X";
            error = newUser.validateSync();
            assert.equal(error.errors['dogs.0.breed'], undefined);

            done();
        });

        it('has a default field (required boolean)', (done) => {

            // field should be required
            delete newUser.dogs[0]['default'];
            let error = newUser.validateSync();
            assert.equal(error.errors['dogs.0.default'], 'default is a required field');

            // field should accept a valid value - false
            newUser.dogs[0].default = false;
            error = newUser.validateSync();
            assert.equal(error.errors['dogs.0.default'], undefined);
            
            // field should accept a valid value - true
            newUser.dogs[0].default = true;
            error = newUser.validateSync();
            assert.equal(error.errors['dogs.0.default'], undefined);

            done();
        });

    });

});