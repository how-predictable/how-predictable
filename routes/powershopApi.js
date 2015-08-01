var express = require('express');
var router = express.Router();
var powershop = require('../api/powershop');

router.get('/oauth', function(req, res, e) {
    res.send(powershop.auth());
});

router.get('/usage_data', function(req, res, e) {
    res.send({
        verson: 2.0,
        result: {
          data: [
            40.27,
            49.59,
            50.36,
            53.62,
            50.72,
            48.66,
            39.11,
            39.28,
            43.98,
            41.04,
            37.68,
            44.91,
            43.07,
            43.96,
            40.06,
            33.7,
            39.91,
            49.27,
            46.72,
            48.62,
            52.32,
            51.02,
            44.06,
            44.3,
            38.74,
            33.68,
            29.04,
            33.59,
            48.87,
            48.41,
            48.96,
            47.04,
            46.32
          ]
        },
    });
});

router.get('/auth', function(req, res, e) {
    powershop.auth(function(err, url) {
        if (!err) {
          res.redirect(url);
        } else {
          res.redirect("/"); // FIXME: Add error message to user
        }
    });
});

module.exports = router;
