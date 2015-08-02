var http = require('http');
var OAuth = require('oauth');

var api = "https://qa.test.powershop.co.nz/external_api";
var oauthTokenSecert;
var oauthAccessSecert;

var oauth = new OAuth.OAuth(
	'https://qa.test.powershop.co.nz/external_api/oauth/request_token',
	'https://qa.test.powershop.co.nz/external_api/oauth/access_token',
	'eb1814912f40af64556a3797b6d116df', // test user token
	's65zImE9Rk1hMfjaEMfTOnTj3ilHs57v', // test user secret
	'1.0A',
	'http://localhost:3000/api/powershop/token', // FIXME: real url plz
	'HMAC-SHA1'
);

/**
 * authincate the user
 * using the wonders of OAuth!
 */
function auth(callback) {
	oauth.getOAuthRequestToken(function(error, oauth_token, oauth_token_secret, results) {
			if (error) {
				console.log('error: ' + JSON.stringify(error));
				callback(error, null);
			} else {
				console.log('oauth_token: ' + oauth_token);
				console.log('oauth_token_secret: ' + oauth_token_secret);
				oauthTokenSecert = oauth_token_secret;
				console.log('requestoken results: ' + JSON.stringify(results));
				console.log("Requesting access token");
				callback(null, "https://qa.test.powershop.co.nz/external_api/oauth/authorize?oauth_token=" + oauth_token);
			}
	});
}

function getToken(oauthToken, oauthVerifier, callback) {
	oauth.getOAuthAccessToken(oauthToken, oauthTokenSecert,  oauthVerifier,
		function (err, oauth_access_token, oauth_access_token_secret, results) {
			if (!err) {
				console.log("OAuth Access token: " +oauth_access_token);
				console.log("OAuth Access secert: " +oauth_access_token_secret);
				oauthAccessSecert = oauth_access_token_secret;
				callback(null, '/dash.html' + "?token=" + oauth_access_token);
			} else {
				console.log(err);
				callback(err, null);
			}
	});
}

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

function getConnectionNumber(accessToken, callback) {
	accounts(accessToken, function(err, data) {
			if (!err) {
				callback(null, JSON.parse(data).result.accounts[0].properties[0].connection_number);
			} else {
				console.log(err);
				callback(err, null);
			}
	});
}

function usageData(startDate, endData,
	accessToken, callback) {
	getConnectionNumber(accessToken, function(err, data){
			console.log(oauthAccessSecert);
			if (!err) {
				oauth.get(
					api + "/v1/usage_data.js?start_date=2015-01-01&end_date=2015-02-02&icp_number=" + data,
					accessToken,
					oauthAccessSecert,
					function(err, data, res){
						if (!err) {
							callback(null, data);
						} else {
							console.log(err);
							callback(err, null);
						}
					}
				);
			} else {
				console.log(err);
				callback(err, null);
			}

	});
}

module.exports = {
	auth: auth,
	usageData: usageData,
	accounts: accounts,
	getToken: getToken,
}
