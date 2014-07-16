var through = require('through2');

module.exports = pool;

function pool(callback) {
	var all = [];
	var stream = through();
	stream
	.on('data', function (data) { 
		all.push(data); 
	})
	.on('error', function (err) {
		callback(err);
	})
	.on('end', function () { 
		callback(null, all.join('').toString());
	});
	return stream;
}