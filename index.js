'use strict';

/**
 * # Toga JavaScript Parser
 *
 * Generates an abstract syntax tree based on a customizable regular-expression
 * grammar for use in the Toga eco-system. Tags are parsed greedily. If it looks
 * like a tag, it's a tag.
 *
 * Supports generating documentation for:
 *
 * - js
 * - ts
 */

var tunic = require('tunic'),
	mixin = require('mtil/object/mixin'),

	/** Default options. */
	defaults = {
		extension: /.(js|ts)$/,
		namedTags: [
			'module',
			'imports',
			'exports',
			'class',
			'extends',
			'method',
			'param',
			'property'
		]
	};

exports.parser = function (options) {
	options = mixin({}, defaults, options);

	return tunic(options);
};
