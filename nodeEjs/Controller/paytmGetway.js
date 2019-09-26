
const http = require('http');
const https = require('https');
const qs = require('querystring');
const checksum_lib = require('./checksum');
const port=require('../app')
var PaytmConfig = {
	mid: "vOrrpq96396320524334",
	key: "ee!59B1jrLHCD!!9",
	website: "WEBSTAGING"
}

const paymentRoute = require('express').Router();

paymentRoute.post('/', (req,res) => {
    
    console.log("payment getway enter",port,req.body.email,req.body.amount,req.body.mobile)
			var params 						= {};
			params['MID'] 					= PaytmConfig.mid;
			params['WEBSITE']				= PaytmConfig.website;
			params['CHANNEL_ID']			= 'WEB';
			params['INDUSTRY_TYPE_ID']	= 'Retail';
			params['ORDER_ID']			= 'TEST_'  + new Date().getTime();
			params['CUST_ID'] 			= 'Customer001';
			params['TXN_AMOUNT']			= req.body.amount;
			params['CALLBACK_URL']		= 'http://localhost:'+port+'/paytm/callback';
			params['EMAIL']				= req.body.email;
			params['MOBILE_NO']			= req.body.mobile;

			checksum_lib.genchecksum(params, PaytmConfig.key, function (err, checksum) {

				var txn_url = "https://securegw-stage.paytm.in/theia/processTransaction"; // for staging
				// var txn_url = "https://securegw.paytm.in/theia/processTransaction"; // for production
				
				var form_fields = "";
				for(var x in params){
					form_fields += "<input type='hidden' name='"+x+"' value='"+params[x]+"' >";
				}
				form_fields += "<input type='hidden' name='CHECKSUMHASH' value='"+checksum+"' >";

				res.send({ data: '<form method="post" action="'+txn_url+'" name="f1">'+form_fields+'<button class="btn btn-primary" type="submit">Pay</button></form><script type="text/javascript">document.f1.submit();</script>'});
			});
});


paymentRoute.post('/callback', (req, res) => {

				var html = "";
				var post_data = req.body;


				// received params in callback
				console.log('Callback Response: ', post_data, "\n");
				html += "<b>Callback Response</b><br>";
				for(var x in post_data){
					html += x + " => " + post_data[x] + "<br/>";
				}
				html += "<br/><br/>";


				// verify the checksum
				var checksumhash = post_data.CHECKSUMHASH;
				// delete post_data.CHECKSUMHASH;
				var result = checksum_lib.verifychecksum(post_data, PaytmConfig.key, checksumhash);
				console.log("Checksum Result => ", result, "\n");
				html += "<b>Checksum Result</b> => " + (result? "True" : "False");
				html += "<br/><br/>";



				// Send Server-to-Server request to verify Order Status
				var params = {"MID": PaytmConfig.mid, "ORDERID": post_data.ORDERID};

				checksum_lib.genchecksum(params, PaytmConfig.key, function (err, checksum) {

					params.CHECKSUMHASH = checksum;
					post_data = 'JsonData='+JSON.stringify(params);
					console.log('1=>post data', post_data)
					var options = {
						hostname: 'securegw-stage.paytm.in', // for staging
						// hostname: 'securegw.paytm.in', // for production
						port: 443,
						path: '/merchant-status/getTxnStatus',
						method: 'POST',
						headers: {
							'Content-Type': 'application/x-www-form-urlencoded',
							'Content-Length': post_data.length
						}
					};


					// Set up the request
					var response = "";
					var post_req = https.request(options, function(post_res) {
						post_res.on('data', function (chunk) {
							response += chunk;
						});

						console.log('3=>response', response)
						post_res.on('end', function(){

							var _result = JSON.parse(response);
							// console.log('4=>result', _result)
							// html += "<b>Status Check Response</b><br>";
							// for(var x in _result){
							// 	html += x + " => " + _result[x] + "<br/>";
							// }

							// console.log('5=>html', html)
							// res.writeHead(200, {'Content-Type': 'text/html'});
							res.send({ data: _result });
							// res.end();
						});
					});

					// post the data
					post_req.write(post_data);
					post_req.end();
				});
})

module.exports = paymentRoute;