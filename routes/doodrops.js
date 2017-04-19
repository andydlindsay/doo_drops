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

module.exports = router;