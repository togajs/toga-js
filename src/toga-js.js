/**
 * # Toga JavaScript
 *
 * Generates an abstract syntax tree based on a customizable regular-expression
 * grammar for use in the Toga eco-system.
 *
 * @title Toga JS
 * @name toga-js
 */

import Tunic from 'tunic';

var parserDefaults = {
	name: 'toga-js',
	extension: /.(js|sjs|ts)$/,
	namedTags: [
		'arg',
		'argument',
		'class',
		'exports',
		'extends',
		'imports',
		'method',
		'module',
		'param',
		'parameter',
		'prop',
		'property'
	]
};

export function parser(options) {
	return new Tunic({
		...parserDefaults,
		...options
	});
}
