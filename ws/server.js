const express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	request = require('request');

const GOOGLE_CAPTCHA_KEY = '6LcXNTMUAAAAALdyHxYG7MDjDbjbWYzexof3Jn2G';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/testCaptcha', (req, res) => {

	var verificationUrl =
		'https://www.google.com/recaptcha/api/siteverify?secret=' +
		GOOGLE_CAPTCHA_KEY +
		'&response=' +
		req.query.response +
		'&remoteip=' +
		'88.6.105.181' ||
		req.connection.remoteAddress;

	request(verificationUrl, (error, response, body) => {
		body = JSON.parse(body);
		// Success will be true or false depending upon captcha validation.
		if (body.success !== undefined && !body.success) {
			return res.json({ "responseCode": 1, "responseDesc": "Failed captcha verification" });
		}
		res.json({ "responseCode": 0, "responseDesc": "Sucess" });
	});
})

app.listen(8081, () => {
	console.log('API listening on port 8081');
});