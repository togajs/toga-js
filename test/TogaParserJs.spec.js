'use strict';

var TogaParserJs = require('../index'),
	es = require('event-stream'),
	expect = require('expect.js'),
	vs = require('vinyl-fs');

describe('TogaParserJs', function () {
	var parser = TogaParserJs;

	it('should create an instance', function () {
		var a = parser(),
			b = new TogaParserJs();

		expect(a).to.be.a(TogaParserJs);
		expect(b).to.be.a(TogaParserJs);

		expect(a).not.to.be(b);
	});

	describe('prototype', function () {
		describe('_transform', function () {
			function toEqualExpected(file, cb) {
				var expected = file.path.replace('fixtures', 'expected');

				if (expected === 'manifest.json') {
					return cb();
				}

				expect(JSON.stringify(file.toga.ast)).to.be(JSON.stringify(require(expected + '.json')));

				cb(null, file);
			}

			function toEqualUndefined(file, cb) {
				expect(file.toga).to.be(undefined);

				cb(null, file);
			}

			it('should parse javascript files', function (done) {
				vs.src(__dirname + '/fixtures/**/*.js')
					.pipe(parser())
					.pipe(es.map(toEqualExpected))
					.on('end', done);
			});

			it('should not parse empty files', function (done) {
				var files = [
					{ path: 'foo.js' },
					{ path: 'foo.js', content: null }
				];

				es.readArray(files)
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
});
