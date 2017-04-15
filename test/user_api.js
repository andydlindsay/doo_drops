// set the env variable to test
process.env.NODE_ENV = 'test';

// require
const chai = require('chai'),
      expect = chai.expect,
      request = require('superagent'),
      config = require('config'),
      mongoose = require('mongoose'),
      User = require('../models/user'),
      assert = require('assert'),
      url = 'localhost:' + config.port + '/';

let newUser;
let jwtToken;

describe('User API', () => {

    before((done) => {
        
        // empty the test database 'users' collection
        User.remove({}, (err) => {
            assert.ifError(err);
        });

        // insert a first user
        const users = [{
            name: "Chris Perkins",
            email: "chris@wotc.com",
            username: "chrisperkins",
            password: "passhash"
        }];
        User.create(users, (err) => {
            assert.ifError(err);
        });

        // populate the newUser object with the basic keys
        newUser = new User({
            name: "",
            email: "",
            username: "",
            password: ""
        });

        done();
    });

    it('does not register a user with invalid information', (done) => {
        request
            .post(url + 'api/users/register')
            .send(newUser)
            .set('Content-Type', 'application/json')
            .end((err, res) => {
                expect(res.body.success).to.equal(false);
                expect(res.body.msg).to.equal('Failed to register user');
                done();
            });
    });

    it('does not register a user with a duplicate username', (done) => {
        newUser.name = "Chris Perkins";
        newUser.email = "chris@wotc.com";
        newUser.username = "chrisperkins";
        newUser.password = "passhash";
        request
            .post(url + 'api/users/register')
            .send(newUser)
            .set('Content-Type', 'application/json')
            .end((err, res) => {
                expect(res.body.success).to.equal(false);
                expect(res.body.errmsg).to.contain('duplicate key');
                done();
            });
    });

    it('registers a user with valid information', (done) => {
        newUser.name = "John Smith";
        newUser.email = "jsmith@yahoo.com";
        newUser.username = "johnsmith";
        newUser.password = "secretcode";
        request
            .post(url + 'api/users/register')
            .send(newUser)
            .set('Content-Type', 'application/json')
            .end((err, res) => {
                expect(res.body.success).to.equal(true);
                expect(res.body.msg).to.equal('User registered');
                User.count({}, (err, count) => {
                    expect(count).to.equal(2);
                    done();
                });
            });
    });

    it('rejects log in attempts with invalid credentials', (done) => {
        // check with invalid username
        newUser.username = "marcjacobs";
        request
            .post(url + 'api/users/authenticate')
            .send(newUser)
            .set('Content-Type', 'application/json')
            .end((err, res) => {
                expect(res.body.success).to.equal(false);
                expect(res.body.msg).to.equal('User not found');
            });
        // change username back
        newUser.username = "johnsmith";

        // check with invalid password
        newUser.password = "known";
        request
            .post(url + 'api/users/authenticate')
            .send(newUser)
            .set('Content-Type', 'application/json')
            .end((err, res) => {
                expect(res.body.success).to.equal(false);
                expect(res.body.msg).to.equal('Wrong password');
                done();
            });
    });

    it('authenticates a user with valid credentials and returns a jwt', (done) => {
        // make sure that username and password are back in original state
        newUser.username = "johnsmith";
        newUser.password = "secretcode";
        request
            .post(url + 'api/users/authenticate')
            .send(newUser)
            .set('Content-Type', 'application/json')
            .end((err, res) => {
                expect(res.body.success).to.equal(true);
                expect(res.body.token).to.exist;
                jwtToken = res.body.token;
                done();
            });
    });

    it('does not allow an authenticated user to access profile information', (done) => {
        // give user an invalid token
        newUser.token = 'fakeToken';
        request
            .get(url + 'api/users/profile')
            .set('Authorization', newUser.token)
            .end((err, res) => {
                expect(res.status).to.equal(401);
                done();
            });
    });

    it('returns profile information to an authenticated user', (done) => {
        // give user a valid token
        newUser.token = jwtToken;
        request
            .get(url + 'api/users/profile')
            .set('Authorization', newUser.token)
            .end((err, res) => {
                expect(res).to.exist;
                expect(res.body.user.name).to.equal(newUser.name);
                expect(res.body.user.email).to.equal(newUser.email);
                done();
            });
    });

});