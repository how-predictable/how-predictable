var http = require('http');
var OAuth = require('oauth');

var oauth = new OAuth.OAuth(
  'https://qa.test.powershop.co.nz/external_api/oauth/request_token',
  'https://qa.test.powershop.co.nz/external_api/oauth/access_token',
  'eb1814912f40af64556a3797b6d116df', // test user token
  's65zImE9Rk1hMfjaEMfTOnTj3ilHs57v', // test user secret
  '1.0A',
  'http://localhost:3000/dash.html', // FIXME: real url plz
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
        console.log('requestoken results: ' + JSON.stringify(results));
        console.log("Requesting access token");
        callback(null, "https://qa.test.powershop.co.nz/external_api/oauth/authorize?oauth_token=" + oauth_token);
      }
  });
}

function usageData() {
  return {
    version: '2',
    result: [
      [132123, '2015-01-10 10:00:00', 'actual', 1482],
      [132123, '2015-01-11 10:00:00', 'actual', 1602],
      [132123, '2015-01-12 10:00:00', 'actual', 1012],
      [132123, '2015-01-13 10:00:00', 'actual', 1214],
      [132123, '2015-01-14 10:00:00', 'actual', 1230],
      [132123, '2015-01-15 10:00:00', 'actual', 101],
    ]
    }
  }

  module.exports = {
    auth: auth,
    usageData: usageData,
  }
