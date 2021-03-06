var through = require('through2');

module.exports = pool;

function pool (cb) { // proposal: options? { toString: Bool, pass: Bool, ... }
	var chunks = [],
			all = [];
	var stream = through(function (chunk, enc, callback) {
		chunks.push(chunk);
		callback();
	}, function (callback) {
		var res = cb(chunks.join('').toString());
		if (res && (res instanceof require('stream').Readable || res.readable)) {
			res.on("data", this.push.bind(this));
      res.on("end", this.emit.bind(this, "end"));
      res.on("error", this.emit.bind(this, "error"));
		} else {
			this.push(chunks.join(''));
		}
		callback();
	});
	return stream;
}