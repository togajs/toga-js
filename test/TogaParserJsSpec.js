'use strict';

var TogaParserJs = require('../index'),
	es = require('event-stream'),
	expect = require('expect.js'),
	vs = require('vinyl-fs');

describe('TogaParserJs', function () {
	var parser = TogaParserJs;

	it('should create an instance when invoked directly', function () {
		var p = parser();
		expect(p instanceof TogaParserJs).to.be(true);
	});

	it('should create an instance when called with `new`', function () {
		var p = new TogaParserJs();
		expect(p instanceof TogaParserJs).to.be(true);
	});

	describe('#_transform', function () {
		var toEqualExpected = function (file, cb) {
				var expected = file.path.replace('fixtures', 'expected');

				if (expected === 'manifest.json') {
					return cb();
				}

				expect(JSON.stringify(file.toga.ast)).to.be(JSON.stringify(require(expected + '.json')));
				cb(null, file);
			},

			toEqualUndefined = function (file, cb) {
				expect(file.toga).to.be(undefined);
				cb(null, file);
			};

		it('should parse javascript files', function (done) {
			vs.src(__dirname + '/fixtures/**/*.js')
				.pipe(parser())
				.pipe(es.map(toEqualExpected))
				.on('end', done);
		});

		it('should not parse empty files', function (done) {
			es.readArray([{ path: 'foo.js' }, { path: 'foo.js', content: null }])
				.pipe(parser())
				.pipe(es.map(toEqualUndefined))
				.on('end', done);
		});

		it('should not parse unknown file types', function (done) {
			vs.src(__dirname + '/fixtures/**/*.coffee')
				.pipe(parser())
				.pipe(es.map(toEqualUndefined))
				.on('end', done);
		});
	});
});
