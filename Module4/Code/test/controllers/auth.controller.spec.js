var assert = require('assert');
var authController = require('../../controllers/auth.controller');
var expect = require('chai').expect;
var should = require('chai').should();
var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");
var sinon = require('sinon');

chai.use(chaiAsPromised);
chai.should();

describe('AuthController', function () {
    beforeEach(function settingUpRoles() {
        console.log('running before each');
       authController.setRoles(['user', 'murat', 'mustafa']); // setting roles
    });

    describe('isAuthorized', function () {
        var user = {}; // creating a user object
        beforeEach(function () {
             user = {
                roles: ['user'], // the user object has a role, 'user'
                isAuthorized: function (neededRole) {
                   return this.roles.indexOf(neededRole) >= 0;
                }
            }
            sinon.spy(user, 'isAuthorized');  // spy allows us to track the execution of user
            authController.setUser(user); // set the user, we have access to it in the tests
        });
        it('Should return false if not authorized', function () {
            var isAuth = authController.isAuthorized('admin');
            console.log(user.isAuthorized);
            user.isAuthorized.calledOnce.should.be.true; // thanks to spy, we can track if used got called
            expect(isAuth).to.be.false;
        })
        it('Should return true if authorized', function () {
            authController.setRoles(['user', 'admin']); // set the roles of authorized users
            var isAuth = authController.isAuthorized('admin'); // check if admin is authorized
            isAuth.should.be.true;
        })
        it('should not allow a get if not authorized');
        it('should allow get if authorized');
    })
    describe('isAuthorizedAsync', function () {
        it('Should return false if not authorized', function (done) {
            authController.isAuthorizedAsync('admin',
                function (isAuth) {
                    assert.equal(false, isAuth);
                    done();
                });
        })
    })
    describe('isAuthorizedPromise', function () {
        it('Should return false if not authorized', function () {
            return authController.isAuthorizedPromise('admin').should.eventually.be.false;
        })
    })
    describe('getIndex', function () {
        var user = {};
        beforeEach(function () {
             user = { // we define the function, later set a stub th control the function
                roles: ['user'],
                isAuthorized: function (neededRole) {
                   return this.roles.indexOf(neededRole) >= 0;
                }
            }
        });
        it('should render index if authorized', function () {
            var isAuth = sinon.stub(user, 'isAuthorized').returns(true); // stub: we can control the function
            // user is now always authorized
            var req = {user: user}; // get index takes 2 params...
            var res = {
                render: function(){}
            };
            /*
            spy: gives us a fake function + track the function's execution
            stub: (spy) + control the function
            mock: (stub) + expects
            */
            var mock = sinon.mock(res); // so we create a mock for res.  spy < stub < mock
            mock.expects('render').once().withExactArgs('index'); // set the expectation for the mock

            authController.getIndex(req, res); // get index takes 2 params...
            isAuth.calledOnce.should.be.true;
            isAuth.calledTwice.should.be.false;
            isAuth.firstCall.args[0].should.equal('admin');

            mock.verify(); // verifying the mock.expect
        })
    })

});