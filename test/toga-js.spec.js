'use strict';

var js = require('../index'),
	expect = require('expect.js');

describe('toga-js spec', function () {
	describe('parser', function () {
		it('should return a transform stream', function () {
			var retval = js.parser();

			expect(retval.pipe).to.be.a(Function);
			expect(retval.readable).to.be(true);
			expect(retval.writable).to.be(true);
		});
	});
});
