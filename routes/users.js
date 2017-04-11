const express = require('express'),
      router = express.Router(),
      User = require('../models/user');

// register
router.post('/register', (req, res) => {
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    });
    User.addUser(newUser, (err, user) => {
        if (err) {
            res.json({ success: false, msg: "Failed to register user" });
        } else {
            res.json({ success: true, msg: "User registered" });
        }
    });
});

module.exports = router;