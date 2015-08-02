/**
 * Module for routing http://{domain name here}/api/powershop/... HTTP requests.
 */
var express = require('express');
var router = express.Router();
var powershop = require('../api/powershop');

router.get('/usage_data', function(req, res, e) {
	var startDate = "2015-06-01"; // FIXME: get start & end dates from user
	var endDate = "2015-07-02";

	powershop.usageData(startDate, endDate,
		req.query.token,
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
		req.query.token,
		function(err, url) {
			if (!err) {
				res.send(url);
			} else {
				console.log('error: ' + JSON.stringify(err));
				res.redirect("/"); // FIXME: Add error message to user
			}
	});
});

module.exports = router;
