var express = require('express');
var router = express.Router();
var powershop = require('../api/powershop');

router.get('/oauth', function(req, res, e) {
    res.send(powershop.auth());
});

router.get('/usage_data', function(req, res, e) {
    var customerId;
    var startDate;
    var endDate;
    res.send(powershop.usageData(customerId, startDate, endDate));
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
