'use strict';

/**
 * # Toga JavaScript Parser
 *
 * Generates an abstract syntax tree based on a customizable regular-expression
 * grammar for use in the Toga eco-system. Tags are parsed greedily. If it looks
 * like a tag, it's a tag.
 */

var base, proto,
	File = require('vinyl'),
	Tunic = require('tunic'),
	inherits = require('mtil/function/inherits');

/**
 * @class Toga.Parser.JavaScript
 * @extends Tunic
 *
 * @constructor
 * @param {Object} options
 */
function TogaParserJavaScript(options) {
	if (!(this instanceof TogaParserJavaScript)) {
		return new TogaParserJavaScript(options);
	}

	Tunic.apply(this, arguments);
}

proto = inherits(TogaParserJavaScript, Tunic);
base = Tunic.prototype;

/**
 * Default options.
 *
 * @property defaults
 * @type {Object}
 */
proto.defaults = {
	extension: /.(js|ts)$/,
	blockIndent: /^[\t \*]/gm,
	blockParse: /^[\t ]*\/\*\*(?!\/)([\s\S]*?)\s*\*\//m,
	blockSplit: /(^[\t ]*\/\*\*(?!\/)[\s\S]*?\s*\*\/)/m,
	tagParse: /^(\w+)[\t \-]*(\{[^\}]+\})?[\t \-]*(\[[^\]]*\]\*?|\S*)?[\t \-]*([\s\S]+)?$/m,
	tagSplit: /^[\t ]*@/m,
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

/**
 * Maps `file.tunic` to `file.toga.ast`.
 *
 * @method push
 * @param {Vinyl} file
 * @return {Boolean}
 */
proto.push = function (file) {
	var toga;

	// Reassign `.tunic` to `.toga.ast`
	if (file && file.tunic) {
		toga = file.toga || (file.toga = {});
		toga.ast = file.tunic;
		delete file.tunic;
	}

	return base.push.apply(this, arguments);
};

/**
 * Generates JavaScript manifest.
 *
 * @method _flush
 * @param {Function} cb
 */
proto._flush = function (cb) {
	this.push(new File({
		path: 'manifest.json',
		contents: new Buffer('{}')
	}));

	cb();
};

module.exports = TogaParserJavaScript;
