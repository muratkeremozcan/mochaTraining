var Add = require('../maths');
var assert = require('assert');
var expect = require('chai').expect;
var should = require('chai').should();
var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");
var sinon = require('sinon');

describe ('Add tests', function () {
  var result = Add(1,2);
  var expectedResult = 3;
  describe('Add tests with ASSERT STYLE', function() {
    it ('test addition ', function() {
      var invalidResult = 99;
      assert.equal(expectedResult, result);
    });
    it ('test addition ASSERT NOT', function() {
      var invalidResult = 99;
      assert.notEqual(expectedResult, invalidResult);
    });
  });
  describe('Add tests with SHOULD STYLE', function() {
    it ('test addition ', function() {
      // var result = Add(10, 11);
      // var expectedResult = 20;
      result.should.equal(expectedResult);
    });
    it ('test additon with SHOULD NOT ', function() {
      // var result = Add(10, 11);
      var invalidResult = 20;
      result.should.not.equal(invalidResult);
    });
  });
  describe('Add tests with EXPECT STYLE', function() {
    it ('test addition ', function() {
      // var result = Add(10, 10);
      // var expectedResult = 20;
      expect(result).to.equal(expectedResult);
    });
    it ('test addition EXPECT NOT ', function() {
      var invalidResult = 50;
      expect(result).not.equal(invalidResult);
    });
  });
});
describe ('Spy Tests', function () {
  var numberOne = 1;
  var numberTwo = 2;
  it ('should log result of add', function() {
    var logSpy = sinon.spy();
    Add(numberOne, numberTwo, logSpy);
  });


});