const express = require('express'),
      router = express.Router(),
      Doodrop = require('../models/doodrop'),
      config = require('config'),
      jwt = require('jsonwebtoken'),
      passport = require('passport');

// count
router.get('/count', (req, res) => {
    Doodrop.count({}, (err, count) => {
        res.json({ count });
    });
});

// insert new doodrop
router.post('/add', passport.authenticate('jwt', {session: false}), (req, res) => {
    let newDoodrop = new Doodrop({
        loc: req.body.loc,
        doo: req.body.doo,
        gender: req.body.gender,
        breed: req.body.breed,
        age: req.body.age,
        neutered: req.body.neutered
    });
    Doodrop.addDoodrop(newDoodrop, (err) => {
        if (err) {
            console.log(err);
            let errmsg = err.message;
            res.json({ success: false, msg: "Failed to insert doodrop", errmsg });
        } else {
            res.json({ success: true, msg: "Doodrop inserted successfully"});
        }
    });
});

module.exports = router;