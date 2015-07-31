/* eslint-env mocha */

import { parser } from '../src/toga-js';
import expect from 'expect';

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
