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

module.exports = router;
