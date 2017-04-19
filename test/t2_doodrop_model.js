// set the env variable to test
process.env.NODE_ENV = 'test';

// imports
const assert = require('assert'),
      Doodrop = require('../models/doodrop');

let newDoodrop;

describe('Doodrop Schema', () => {

    describe('Fields:', () => {

        beforeEach((done) => {

            // create a valid doodrop for use in each test
            newDoodrop = new Doodrop({
                loc: {
                    lng: 57.12345,
                    lat: 65.12345
                },
                doo: true,
                gender: 'female',
                breed: 'lab X',
                age: 2920,
                neutered: true
            });

            done();

        });

        describe('loc:', () => {

            describe('lng:', () => {

                it('should be required', (done) => {
                    newDoodrop.loc.lng = "";
                    let error = newDoodrop.validateSync();
                    assert.equal(error.errors['loc.lng'].message, 'lng is a required field');

                    done();
                });

                it('should be a number', (done) => {
                    newDoodrop.loc.lng = 'forthcoming';
                    let error = newDoodrop.validateSync();
                    assert.equal(error.errors['loc.lng'].name, 'CastError');

                    done();
                });

                it('should have a minimum value of -180', (done) => {
                    newDoodrop.loc.lng = -181;
                    let error = newDoodrop.validateSync();
                    assert.equal(error.errors['loc.lng'].name, 'ValidatorError');

                    done();
                });

                it('should have a maximum value of 180', (done) => {
                    newDoodrop.loc.lng = 181;
                    let error = newDoodrop.validateSync();
                    assert.equal(error.errors['loc.lng'].name, 'ValidatorError');

                    done();
                });

                it('should accept a valid value', (done) => {
                    newDoodrop.loc.lng = 175.12345;
                    let error = newDoodrop.validateSync();
                    assert.equal(error, undefined);

                    done();
                });

            });

            describe('lat:', () => {

                it('should be required', (done) => {
                    newDoodrop.loc.lat = "";
                    let error = newDoodrop.validateSync();
                    assert.equal(error.errors['loc.lat'].message, 'lat is a required field');

                    done();
                });

                it('should be a number', (done) => {
                    newDoodrop.loc.lat = 'forthcoming';
                    let error = newDoodrop.validateSync();
                    assert.equal(error.errors['loc.lat'].name, 'CastError');

                    done();
                });

                it('should have a minimum value of -90', (done) => {
                    newDoodrop.loc.lat = -91;
                    let error = newDoodrop.validateSync();
                    assert.equal(error.errors['loc.lat'].name, 'ValidatorError');

                    done();
                });

                it('should have a maximum value of 90', (done) => {
                    newDoodrop.loc.lat = 91;
                    let error = newDoodrop.validateSync();
                    assert.equal(error.errors['loc.lat'].name, 'ValidatorError');

                    done();
                });

                it('should accept a valid value', (done) => {
                    newDoodrop.loc.lat = 75.12345;
                    let error = newDoodrop.validateSync();
                    assert.equal(error, undefined);

                    done();
                });


            });

        });

        describe('doo:', () => {

            it('should be required', (done) => {
                newDoodrop.doo = null;
                let error = newDoodrop.validateSync();
                assert.equal(error.errors['doo'].message, 'doo is a required field');

                done();
            });

            it('should accept a valid value', (done) => {
                newDoodrop.doo = false;
                let error = newDoodrop.validateSync();
                assert.equal(error, undefined);

                newDoodrop.doo = true;
                error = newDoodrop.validateSync();
                assert.equal(error, undefined);

                done();
            });

        });

        describe('gender:', () => {

            it('should be either \'female\' or \'male\'', (done) => {
                newDoodrop.gender = "monkey";
                let error = newDoodrop.validateSync();
                assert.equal(error.errors['gender'].name, 'ValidatorError');

                done();
            });

            it('should accept a valid value', (done) => {
                newDoodrop.gender = "male";
                let error = newDoodrop.validateSync();
                assert.equal(error, undefined);

                newDoodrop.gender = "female";
                error = newDoodrop.validateSync();
                assert.equal(error, undefined);

                done();
            });

        });

        describe('breed:', () => {

            it('should not contain numbers', (done) => {
                newDoodrop.breed = "heavy9";
                let error = newDoodrop.validateSync();
                assert.equal(error.errors['breed'].name, 'ValidatorError');

                done();
            });

            it('should not contain special characters', (done) => {
                newDoodrop.breed = "?<>&*@#";
                let error = newDoodrop.validateSync();
                assert.equal(error.errors['breed'].name, 'ValidatorError');

                done();
            });

            it('should have a maximum length of 25', (done) => {
                newDoodrop.breed = "lab x";
                while (newDoodrop.breed.length < 30) {
                    newDoodrop.breed += "nnnnn";
                }
                let error = newDoodrop.validateSync();
                assert.equal(error.errors['breed'].message, 'dog breed must be less than 26 characters');

                done();
            });

            it('should accept a valid value', (done) => {
                newDoodrop.breed = "lab x";
                let error = newDoodrop.validateSync();
                assert.equal(error, undefined);

                done();
            });

        });

        describe('age:', () => {

            it('should be a number', (done) => {
                newDoodrop.age = 'forthcoming';
                let error = newDoodrop.validateSync();
                assert.equal(error.errors['age'].name, 'CastError');

                done();
            });

            it('should be an integer rounding to nearest whole number', (done) => {
                newDoodrop.age = 2921.235;
                assert.equal(newDoodrop.age, 2921);

                done();
            });

            it('should have a minimum value of 0', (done) => {
                newDoodrop.age = -1;
                let error = newDoodrop.validateSync();
                assert.equal(error.errors['age'].name, 'ValidatorError');

                done();
            });

            it('should accept a valid value', (done) => {
                newDoodrop.age = 2920;
                let error = newDoodrop.validateSync();
                assert.equal(error, undefined);

                done();
            });

        });

        describe('neutered:', () => {

            it('should accept a valid value', (done) => {
                newDoodrop.neutered = false;
                let error = newDoodrop.validateSync();
                assert.equal(error, undefined);

                newDoodrop.neutered = true;
                error = newDoodrop.validateSync();
                assert.equal(error, undefined);

                done();
            });

        });

        describe('ts:', () => {

            it('should have a default value', (done) => {
                assert.ok(newDoodrop.ts);

                done();
            });

        });

    });

});