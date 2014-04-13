'use strict';

var TogaParserJs = require('../index');
var es = require('event-stream');
var vs = require('vinyl-fs');

describe('TogaParserJs', function () {
    var parser = TogaParserJs;

    it('should create an instance when invoked directly', function () {
        var p = parser();
        expect(p instanceof TogaParserJs).toBe(true);
    });

    it('should create an instance when called with `new`', function () {
        var p = new TogaParserJs();
        expect(p instanceof TogaParserJs).toBe(true);
    });

    describe('#_transform', function () {
        var toEqualExpected = function (file, cb) {
            var expected = file.path.replace('fixtures', 'expected');
            expect(file.toga.ast).toEqual(require(expected + '.json'));
            cb(null, file);
        };

        var toEqualUndefined = function (file, cb) {
            expect(file.toga).toBeUndefined();
            cb(null, file);
        };

        it('should parse javascript files', function (done) {
            vs.src(__dirname + '/fixtures/**/*.js')
                .pipe(parser())
                .pipe(es.map(toEqualExpected))
                .on('end', done);
        });

        it('should not parse empty files', function (done) {
            es.readArray([{ path: 'foo.js' }, { path: 'foo.js', content: null }])
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
