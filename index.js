'use strict';

/**
 * # Toga JavaScript Parser
 *
 * Generates an abstract syntax tree based on a customizable regular-expression
 * grammar for use in the Toga eco-system. Tags are parsed greedily. If it looks
 * like a tag, it's a tag.
 */

// var File = require('vinyl');
var Tunic = require('tunic');
var inherits = require('mout/lang/inheritPrototype');
var namespace = require('mout/object/namespace');

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

var proto = inherits(TogaParserJavaScript, Tunic);
var base = Tunic.prototype;

/**
 * Default options.
 *
 * @property defaults
 * @type {Object}
 */
proto.defaults = {
    extension: /.(js|ts)$/,
    blockIndents: /^[\t \*]/gm,
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
proto.push = function(file) {
    var toga;

    // Reassign tunic to toga.ast
    if (file && file.tunic) {
        toga = namespace(file, 'toga');
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
    // this.push(new File({
    //     path: 'manifest.json',
    //     contents: new Buffer(JSON.stringify(this.data, null, 2))
    // }));

    cb();
};

module.exports = TogaParserJavaScript;
