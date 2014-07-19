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
		if (typeof res !== 'undefined' && !(res instanceof require('stream').Readable || res.readable)) {
			console.log('hey look here', res);
			if (typeof res === 'object') {
				this.push(JSON.stringify(res));
			} else if (typeof String(res) === 'string') {
				this.push(String(res));
			} else {
				this.push(null);
			}
		} else if (typeof res !== 'undefined' && (res instanceof require('stream').Readable || res.readable)) {
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