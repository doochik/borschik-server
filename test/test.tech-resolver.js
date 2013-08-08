describe('tech-resolver:', function() {

    var expect = require('chai').expect;

    beforeEach(function() {
        this.techResolver = require('../lib/tech-resolver');
    });

    afterEach(function() {
        delete this.techResolver;
    });

    describe('url2Extension:', function() {

        it('should return ".js" for "test/file.js"', function() {
            expect(this.techResolver.url2Extension('test/file.js')).to.equal('.js');
        });

        it('should return "" for "test/file"', function() {
            expect(this.techResolver.url2Extension('test/file')).to.equal('');
        });

    });

    describe('getTech:', function() {

        it('should return ".css" tech decl', function() {
            expect(this.techResolver.getTech('.css')).to.eql({
                module: '../processors/css',
                contentType: 'text/css; charset=utf-8'
            });
        });

        it('should return ".js" tech decl', function() {
            expect(this.techResolver.getTech('.js')).to.eql({
                module: '../processors/js',
                contentType: 'application/x-javascript; charset=utf-8'
            });
        });

        it('should return undefined for unknown tech', function() {
            expect(this.techResolver.getTech('.unknown')).to.be.undefined;
        });

    });

    describe('resolve:', function() {

        it('should return js-tech for "/test/file.js"', function() {
            var jsTech = require('../processors/js');
            expect(this.techResolver.resolve('test/file.js')).to.eql({
                module: '../processors/js',
                contentType: 'application/x-javascript; charset=utf-8',
                processor: jsTech
            });
        });

        it('should return css-tech for "/test/file.css"', function() {
            var cssTech = require('../processors/css');
            expect(this.techResolver.resolve('test/file.css')).to.eql({
                module: '../processors/css',
                contentType: 'text/css; charset=utf-8',
                processor: cssTech
            });
        });

    });

});