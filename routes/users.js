const express = require('express'),
      router = express.Router(),
      User = require('../models/user'),
      config = require('config'),
      jwt = require('jsonwebtoken'),
      passport = require('passport');

// register
router.post('/register', (req, res) => {
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    });
    User.addUser(newUser, (err) => {
        if (err) {
            let errmsg = err.message;
            res.json({ success: false, msg: "Failed to register user", errmsg });
        } else {
            res.json({ success: true, msg: "User registered" });
        }
    });
});

// authenticate
router.post('/authenticate', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    User.getUserByUsername(username, (err, user) => {
        if (err) {
            return res.json({success: false, msg: err.message});
        }
        if (!user) {
            return res.json({success: false, msg: 'User not found'});
        }
        User.comparePassword(password, user.password, (err, isMatch) => {
            if (err) {
                return res.json({success: false, msg: err.message});
            }
            if (isMatch) {
                const token = jwt.sign(user, config.secret, {
                    expiresIn: 60 * 60 * 24 * 7 // 1 week
                });
                res.json({
                    success: true,
                    token: 'JWT ' + token,
                    user: {
                        id: user._id,
                        name: user.name,
                        username: user.username,
                        email: user.email
                    }
                });
            } else {
                return res.json({success: false, msg: 'Wrong password'});
            }
        });
    });
});

// profile
router.get('/profile', passport.authenticate('jwt', {session: false}), (req, res) => {
    res.json({user: req.user})
});

module.exports = router;