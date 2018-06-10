var IsAlive = require('../function');
var Add = require('../maths');
var AddLog = require('../mathsLog');
var assert = require('assert');
var expect = require('chai').expect;
var chai = require("chai");
var should = require('chai').should();
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
    it ('test addition with SHOULD NOT ', function() {
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
describe ('SINON SPY Tests', function () {
  it ('should log result of add SHOULD', function() {
    var numberOne = 1;
    var numberTwo = 2;
    var logSpy = sinon.spy();
    AddLog(numberOne, numberTwo, logSpy);
    logSpy.called.should.be.true;
    logSpy.calledWith(3).should.be.true;
  });
});
describe('SINON STUB Tests', function() {
  it ('should return true when ping callback returns true', function() {
    var pinger = sinon.stub();
    pinger.returns(true);
    var webSiteIsAlive = IsAlive(pinger);
    webSiteIsAlive.should.be.true;

  });
  it ('should return true when all 3 pings are successful (onFirstCall, 2nd call..)', function() {
    var pinger = sinon.stub();
    pinger.onFirstCall().returns(true);
    pinger.onSecondCall().returns(true);
    pinger.onThirdCall().returns(true);
    var webSiteIsAliveReturnsThreePings = IsAlive(pinger);
    webSiteIsAliveReturnsThreePings.should.be.true;

  });
  it ('should return false if one of 3 pings are failing (onFirstCall, 2nd call..false)', function() {
    var pinger = sinon.stub();
    pinger.onFirstCall().returns(true);
    pinger.onSecondCall().returns(false);
    pinger.onThirdCall().returns(true);
    var webSiteIsAliveReturnsThreePings = IsAlive(pinger);
    webSiteIsAliveReturnsThreePings.should.be.false;
  });
  it('should return an error when ping throws an error (stub.throws', function() {
    var pinger = sinon.stub();
    pinger.throws(function() {
      return new Error();
    });
    var error = IsAlive(pinger);
    error.message.should.equal('ping threw exception');
  });
});

var API = {
  IsAlive: function(address) {
    // this.killServer(); // DEBUG: TOGGLE TO TEST KILLSERVER .never
    try {
      var pingOneSuccess = this.ping(address);
      var pingTwoSuccess = this.ping(address);
      var pingThreeSuccess = this.ping(address);
    } catch (e) {
      return new Error('ping threw exception');
    }
    if (pingOneSuccess && pingTwoSuccess && pingThreeSuccess) {
      return true;
    }
    return false;
  },
  ping: function() {
    return true;
  },
  killServer: function() {}
}
describe ('IsAlive MOCK TESTS', function() {
  it('should call ping 3 times', function() {
    var mockAPI = sinon.mock(API);
    mockAPI.expects('ping').exactly(3);
    API.IsAlive(); // need to setAPI alive to check the expectations
    mockAPI.verify(); // need to verify the behavior of the API
    mockAPI.restore(); // need to reset the API/ test
  });
  it('should call ping at least once', function() {
    var mockAPI = sinon.mock(API);
    mockAPI.expects('ping').atLeast(1);
    API.IsAlive();
    mockAPI.verify();
    mockAPI.restore();
  });
  it('should call ping at most 3 times', function() {
    var mockAPI = sinon.mock(API);
    mockAPI.expects('ping').atMost(3).atLeast(1);
    API.IsAlive();
    mockAPI.verify();
    mockAPI.restore();
  });
  it('should not call killServer ', function() {
    var mockAPI = sinon.mock(API);
    mockAPI.expects('killServer').never(); // this mock expects illServer not to called
    API.IsAlive();
    mockAPI.verify();
    mockAPI.restore();
  });
  it('should ping the server if the server address is passed in ', function() {
    var address = '1.1.1.1';
    var mockApi = sinon.mock(API);
    mockApi.expects('ping').withExactArgs(address).exactly(3);
    API.IsAlive(address);
    mockApi.verify();
    mockApi.restore();


  });
});
