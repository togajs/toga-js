/* eslint-env mocha */

var parser = require('../src/toga-js').parser,
	expect = require('expect'),
	streamArray = require('stream-array'),
	toga = require('toga'),
	join = require('path').join,
	readFileSync = require('fs').readFileSync,

	config = {
		fixtures: join(__dirname, 'fixtures'),
		expected: join(__dirname, 'expected'),
		actual: join(__dirname, 'actual')
	};

describe('toga-js e2e', function () {
	describe('raw streams', function () {
		function testWithArray(array, stream, done) {
			function expectChunk(chunk) {
				expect(chunk).toEqual({
					type: 'Documentation',
					body: [{
						type: 'CommentBlock',
						description: '',
						trailingCode: 'hello',
						tags: []
					}]
				});
			}

			streamArray(array)
				.pipe(stream)
				.on('data', expectChunk)
				.on('error', done)
				.on('end', done);
		}

		it('should parse strings', function (done) {
			var strings = ['hello', 'hello'];

			testWithArray(strings, parser(), done);
		});

		it('should parse buffers', function (done) {
			var buffers = [new Buffer('hello'), new Buffer('hello')];

			testWithArray(buffers, parser(), done);
		});
	});

	describe('object streams', function () {
		function testWithFile(filename, stream, done) {
			var fixture = join(config.fixtures, filename),
				expected = join(config.expected, filename + '.json');

			function expectFile(file) {
				var actual = JSON.stringify(file.docAst, null, 2) + '\n';

				expect(actual).toEqual(String(readFileSync(expected)));
			}

			toga
				.src(fixture)
				.pipe(stream)
				.on('data', expectFile)
				.on('error', done)
				.on('end', done);
		}

		it('should parse js', function (done) {
			testWithFile('tags.js', parser(), done);
		});

		it('should parse stratified js', function (done) {
			testWithFile('tags.sjs', parser(), done);
		});

		it('should parse typescript', function (done) {
			testWithFile('tags.ts', parser(), done);
		});

		it('should ignore unknown files', function (done) {
			function expectFile(file) {
				expect(file.docAst).toBe(undefined);
			}

			toga
				.src(join(config.fixtures, 'unused.coffee'))
				.pipe(parser())
				.on('data', expectFile)
				.on('error', done)
				.on('end', done);
		});
	});
});
