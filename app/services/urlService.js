//var longToShortHash = {};
//var shortToLongHash = {};

var UrlModel = require('../models/urlModel');
var redis = require("redis");

var port = process.env.REDIS_PORT_6379_TCP_PORT;
var host = process.env.REDIS_PORT_6379_TCP_ADDR;

var redisClient = redis.createClient(port, host);
var encode = [];
var decode = {};

var getCharArray = function (charA, charZ) {
    var arr = [];
    var i = charA.charCodeAt(0);
    var j = charZ.charCodeAt(0);

    for (; i <= j; i++) {
        arr.push(String.fromCharCode(i));
    }
    return arr;
};
encode = encode.concat(getCharArray('a', 'z'));
encode = encode.concat(getCharArray('0', '9'));
encode = encode.concat(getCharArray('A', 'Z'));

for (var i = 0; i < encode.length; i++) {
    decode[encode[i]] = i;
}

var getShortUrl = function(longUrl, callback) {
	if (longUrl.indexOf("http") === -1) {
		longUrl = "http://" + longUrl;
	}

	redisClient.get(longUrl, function(err, shortUrl){
		if (shortUrl) {
			callback({
				shortUrl: shortUrl,
				longUrl: longUrl
			});
		} else {
			UrlModel.findOne({longUrl: longUrl}, function(err, data){
			if (data != null) {
				console.log("from redis");
				redisClient.set(data.shortUrl, data.longUrl);
				redisClient.set(data.longUrl, data.shortUrl);
				callback(data);
			} else {
				generateShortUrl(function(shortUrl){
					var url = new UrlModel({
						shortUrl: shortUrl,
						longUrl: longUrl
					});
					url.save();
					redisClient.set(shortUrl, longUrl);
					redisClient.set(longUrl, shortUrl);
					callback(url)
				});

			}
			});
		}
	});
	

	/*
	if (longToShortHash[longUrl] != null) {
		return longToShortHash[longUrl];
	} else {
		var shortUrl = generateShortUrl();
		longToShortHash[longUrl] = shortUrl;
		shortToLongHash[shortUrl] = longUrl;
		console.log(longToShortHash);
		return shortUrl;
	}
	*/
};

var getLongUrl = function(shortUrl, callback) {
	
	redisClient.get(shortUrl, function(err, longUrl){
		if (longUrl) {
			console.log("from redis");
			callback({
				shortUrl: shortUrl,
				longUrl: longUrl
			});
		} else {
			UrlModel.findOne({shortUrl: shortUrl}, function(err, data){
				callback(data);
			});
			redisClient.set(shortUrl, longUrl);
			redisClient.set(longUrl, shortUrl);
		}
	});
	
};

var generateShortUrl = function(callback) {
	UrlModel.count({}, function(err, num){
		callback(convertTo62(num));
	});
};

var convertTo62 = function(num) {
	var result = "";
	do {
		result = encode[num % 62] + result;
		num = Math.floor(num / 62);
	} while (num);
	return result;
}



module.exports = {
	getShortUrl : getShortUrl,
	getLongUrl: getLongUrl
};