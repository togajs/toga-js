/*eslint-env mocha */

var parser = require('../src/toga-js').parser,
	expect = require('expect');

describe('toga-js spec', function () {
	describe('parser', function () {
		it('should return a transform stream', function () {
			var retval = parser();

			expect(retval.pipe).toBeA(Function);
			expect(retval.readable).toBe(true);
			expect(retval.writable).toBe(true);
		});
	});
});
