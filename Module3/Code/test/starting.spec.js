var assert = require('assert');
var should = require('chai').should();
var expect = require('chai').expect;

describe('Basic Mocha Test', function () {
    it('should deal with objects', function () {
        var obj = { name: 'Jon', gender: 'male' };
        var objB = { name: 'Jon', gender: 'male' };

        obj.should.deep.equal(objB);
        obj.should.have.property('name').equal('Jon');
        expect(obj).to.have.property('gender').equal('male');

    });
    it('should allow testing nulls', function () {
        var iAmNull = null;
        should.not.exist(iAmNull);
        expect(iAmNull).to.not.exist;
    })
});