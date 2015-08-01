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
				1234,
				23423,
				1212,
				234,
				345345,
				123423,
				2342,
				234,
				23423,
				234234,
				1234,
				23423,
				1212,
				234,
				345345,
				123423,
				2342,
				234,
				23423,
				234234,
				1234,
				23423,
				1212,
				234,
				345345,
				123423,
				2342,
				234,
				23423,
				234234,
				12343,
				7834,
				7345
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
