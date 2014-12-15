'use strict';

var js = require('../index'),
	es = require('event-stream'),
	expect = require('expect.js'),
	fs = require('fs'),
	toga = require('toga'),

	config = {
		js: __dirname + '/fixtures/**/*.js',
		txt: __dirname + '/fixtures/**/*.txt',
		dest: __dirname + '/actual'
	};

describe('toga-js e2e', function () {
	var count;

	function toEqualExpected(file, cb) {
		count++;

		var expected = file.path.replace('fixtures', 'expected') + '.json';
		expect(JSON.stringify(file.ast, null, 4) + '\n').to.be(fs.readFileSync(expected, 'utf8'));
		cb(null, file);
	}

	function toEqualUndefined(file, cb) {
		count++;

		expect(file.toga).to.be(undefined);
		cb(null, file);
	}

	it('should parse javascript files', function (done) {
		count = 0;

		toga
			.src(config.js)
			.pipe(js.parser())
			.pipe(es.map(toEqualExpected))
			.pipe(toga.dest(config.dest))
			.on('error', done)
			.on('end', function () {
				expect(count).to.be(8);
				done();
			});
	});

	it('should not parse empty files', function (done) {
		count = 0;

		var files = [
			{ path: 'foo.js' },
			{ path: 'foo.js', content: null },
			undefined
		];

		es
			.readArray(files)
			.pipe(js.parser())
			.pipe(es.map(toEqualUndefined))
			.on('error', done)
			.on('end', function () {
				expect(count).to.be(2);
				done();
			});
	});

	it('should not parse unknown file types', function (done) {
		count = 0;

		toga
			.src(config.txt)
			.pipe(js.parser())
			.pipe(es.map(toEqualUndefined))
			.pipe(toga.dest(config.dest))
			.on('error', done)
			.on('end', function () {
				expect(count).to.be(1);
				done();
			});
	});
});
