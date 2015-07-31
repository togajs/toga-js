/**
 * # Toga JavaScript
 *
 * Generates an abstract syntax tree based on a customizable regular-expression
 * grammar for use in the Toga eco-system.
 *
 * @title Toga JS
 * @name toga-js
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.parser = parser;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _tunic = require('tunic');

var _tunic2 = _interopRequireDefault(_tunic);

var parserDefaults = {
	name: 'toga-js',
	extension: /.(js|sjs|ts)$/,
	namedTags: ['arg', 'argument', 'class', 'exports', 'extends', 'imports', 'method', 'module', 'param', 'parameter', 'prop', 'property']
};

function parser(options) {
	return new _tunic2['default'](_extends({}, parserDefaults, options));
}