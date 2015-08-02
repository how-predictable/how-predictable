/**
* Module for routing http://{domain name here}/api/powershop/... HTTP requests.
*/
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
    powershop.usageData("","",customerId,
      "95a8ecc99d688753dc2179929e1abc84",
      "923d222c208c6094ed4941091bb6e170",
      function(err, data) {
        if (!err) {
          res.send(data);
        } else {
          res.send(err);
        }
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

router.get('/token', function(req, res, e) {
    powershop.getToken(
      req.query.oauth_token,
      req.query.oauth_verifier,
      function(err, url) {
        if (!err) {
          res.redirect(url);
        } else {
          res.redirect("/"); // FIXME: Add error message to user
        }
    });
});


router.get('/accounts', function(req, res, e) {
    powershop.accounts(
      "95a8ecc99d688753dc2179929e1abc84",
      "923d222c208c6094ed4941091bb6e170",
      function(err, url) {
        if (!err) {
          res.send(url);
        } else {
          console.log(err);
          res.redirect("/"); // FIXME: Add error message to user
        }
    });
});

module.exports = router;
