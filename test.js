var test = require('tap').test,
		str = require('through2-str'),
		pool = require('./');

test('return data', function (t) {
	t.plan(1);

	str('hello').pipe(pool(function (data) {
		t.equal(data, 'hello');
	}));
});

test('forward returned readable stream', function (t) {
	t.plan(1);

	str('HELLO')
	.pipe(pool(function (data) {
		return str(data.toLowerCase());
	}))
	.pipe(pool(function (data) {
		t.equal(data, 'hello');
	}));
});

test('forward returned string', function (t) {
	t.plan(1);

	str('arbitrary string')
	.pipe(pool(function (data) {
		return 'hello'
	}))
	.pipe(pool(function (data) {
		t.equal(data, 'hello');
	}));
});

test('forward returned object as JSON', function (t) {
	t.plan(1);

	str('arbitrary string')
	.pipe(pool(function (data) {
		return { greeting: "beepboop" }
	}))
	.pipe(pool(function (data) {
		t.equal(data, '{"greeting":"beepboop"}');
	}));
});

test('forward returned number as string', function (t) {
	t.plan(1);

	str('arbitrary string')
	.pipe(pool(function (data) {
		return 1
	}))
	.pipe(pool(function (data) {
		t.equal(data, '1');
	}));
});

test('forward returned boolean as string', function (t) {
	t.plan(1);

	str('arbitrary string')
	.pipe(pool(function (data) {
		return false
	}))
	.pipe(pool(function (data) {
		t.equal(data, 'false');
	}));
});
// test streams with many chunks