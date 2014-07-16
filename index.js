var through = require('through2');

module.exports = handle;

function handle(callback) {
	var all = [];
	var stream = through();
	stream
	.on('data', function(data) { 
		all.push(data); 
	})
	.on('end', function() { 
		callback(all.join('').toString());
	});
	return stream;
}