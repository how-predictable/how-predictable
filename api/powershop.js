var http = require('http');
var OAuth = require('oauth');

var api = "https://qa.test.powershop.co.nz/external_api";
var oauthTokenSecert;
var oauthAccessSecert;

// first leg of OAuth
var oauth = new OAuth.OAuth(
	// FIXME: Change urls to point to real servers for production
	'https://qa.test.powershop.co.nz/external_api/oauth/request_token',
	'https://qa.test.powershop.co.nz/external_api/oauth/access_token',
	// FIXME: securely store application keys
	'eb1814912f40af64556a3797b6d116df', // application token
	's65zImE9Rk1hMfjaEMfTOnTj3ilHs57v', // application user secret
	'1.0A',
	'http://localhost:3000/api/powershop/token', // FIXME: Full URL
	'HMAC-SHA1'
);

/**
 * Start the OAuth process with reditecting the client to powershop's
 * loging page
 *
 * Params:
 *			callback - a function that takes (error, results) with the
 *			results is a url the clinet should be redirected to
 * Returns:
 *		undefined (this function runs asynchronous call(s) therefore a callback is used to pass the results/error back)
 */
function auth(callback) {
	oauth.getOAuthRequestToken(function(err, oauth_token, oauth_token_secret, results) {
			if (err) {
				console.log('error: ' + JSON.stringify(error));
				callback(error, null);
			} else {
				// FIXME: store more than one token
				oauthTokenSecert = oauth_token_secret;
				callback(null, "https://qa.test.powershop.co.nz/external_api/oauth/authorize?oauth_token=" + oauth_token);
			}
	});
}

/**
 * Finish the OAuth process
 *
 * Params:
 *		oauthToken - OAuth token from the client
 *		oauthVerifier - OAuth verifier token from the client
 *		callback - a function that takes (error, results) with the
 *		results is a url the clinet should be redirected to. Called
 *		after getting access code from Powershop
 *
 * Returns:
 *		undefined (this function runs asynchronous call(s) therefore a callback is used to pass the results/error back)
 *
 */
function getToken(oauthToken, oauthVerifier, callback) {
	oauth.getOAuthAccessToken(oauthToken, oauthTokenSecert,  oauthVerifier,
		function (err, oauth_access_token, oauth_access_token_secret, results) {
			if (!err) {
				console.log("OAuth Access token: " +oauth_access_token);
				console.log("OAuth Access secert: " +oauth_access_token_secret);
				oauthAccessSecert = oauth_access_token_secret;
				callback(null, '/dash.html' + "?token=" + oauth_access_token);
			} else {
				console.log('error: ' + JSON.stringify(err));
				callback(err, null);
			}
	});
}

/**
 * Call Powershop's accounts API endpoint
 *
 * Params:
 *		accessToken - token passed from client
 *		callback - a function that takes (error, results) with the
 *		results is the data from the Powershop API.
 *		The JSON format is defined in https://github.com/powershop/powershop-api/blob/master/doc/Powershop%20API%20v2.0.pdf?raw=true under "accounts"
 *		Called after getting results from Powershop
 *
 * Returns:
 *		undefined (this function runs asynchronous call(s) therefore a callback is used to pass the results/error back)
 */
function accounts(accessToken, callback) {
	oauth.get(
		api + "/v2/accounts.js" ,
		accessToken,
		oauthAccessSecert,
		function(err, data, res){
			if (!err) {
				callback(null, data);
			} else {
				callback(err, null);
			}
		}
	);
}

/**
 * Get the connection number needed for icp_number parameter for Powershop's
 * API calls
 *
 * Params:
 *		accessToken - token passed from client
 *		callback - a function that takes (error, results) with the
 *		results is a string of the connection number. Called
 *		after getting results from Powershop
 *
 * Returns:
 *		undefined (this function runs asynchronous call(s) therefore a callback is used to pass the results/error back)
 */
function getConnectionNumber(accessToken, callback) {
	accounts(accessToken, function(err, data) {
			if (!err) {
				callback(null, JSON.parse(data).result.accounts[0].properties[0].connection_number);
			} else {
				console.log('error: ' + JSON.stringify(err));
				callback(err, null);
			}
	});
}

/**
 * Get the power usage data from Powershop's API
 *
 * Params:
 *		start_date - A string in the format YYYY-MM-DD that represents the start of the period wished to be queried
 *		end_date - A string in the format YYYY-MM-DD that represents the end of the period wished to be queried
 *		accessToken - token passed from client
 *		callback - a function that takes (error, results) with the
 *		results is a string of json from Powershop's API.
 *		The JSON format is defined in https://github.com/powershop/powershop-api/blob/master/doc/Powershop%20API%20v2.0.pdf?raw=true under "usage_data"
 *		Called after getting results from Powershop
 *
 * Returns:
 *		undefined (this function runs asynchronous call(s) therefore a callback is used to pass the results/error back)
 */
function usageData(startDate, endDate,
	accessToken, callback) {
	getConnectionNumber(accessToken, function(err, data){
		if (!err) {
			oauth.get(
				api + "/v1/usage_data.js?start_date=" + startDate + "&end_date=" + endDate + "&icp_number=" + data,
				accessToken,
				oauthAccessSecert,
				function(err, data, res){
					if (!err) {
						callback(null, data);
					} else {
						console.log('error: ' + JSON.stringify(err));
						callback(err, null);
					}
				}
			);
		} else {
			console.log('error: ' + JSON.stringify(err));
			callback(err, null);
		}

	});
}

// export out functions
module.exports = {
	auth: auth,
	usageData: usageData,
	accounts: accounts,
	getToken: getToken,
};
