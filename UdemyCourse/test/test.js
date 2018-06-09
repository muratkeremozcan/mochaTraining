var Add = require('../maths');
var assert = require('assert');
var expect = require('chai').expect;
var should = require('chai').should();
var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");
var sinon = require('sinon');

describe ('Add tests', function () {
  it ('should return 3 when called with 1 and 2', function() {
    var result = Add(1,2);
    var expectedResult = 4;
    assert.equal(expectedResult, result);
  });
  it ('should return 8 when called with 5 and 3', function() {
    var result = Add(5,3);
    var expectedResult = 8;
    assert.equal(expectedResult, result);
  });
});