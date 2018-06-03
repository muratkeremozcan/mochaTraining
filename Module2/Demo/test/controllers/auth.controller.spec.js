var assert = require('assert');
var authController = require('../../controllers/auth.controller');



describe('AuthController', function () {
    beforeEach(function settingUpRoles() {
        console.log('running before each');
        authController.setRoles(['user']);
    });

    describe('isAuthorized', function () {

        it('Should return false if not authorized', function () {
            assert.equal(false, authController.isAuthorized('admin'));
        })
        it('Should return true if authorized', function () {
            authController.setRoles(['user', 'admin']);
            assert.equal(true, authController.isAuthorized('user'));
        })
        it('should not allow a get if not authorized');
        it('should allow get if authorized');
    })
    describe('isAuthorizedAsync', function () {

        it('async: Should return false if not authorized', function (done) {
            authController.isAuthorizedAsync('user', function (isAuth) { // isAuth is a callback function, returns true if 
                    assert.equal(true, isAuth); // the needed role exists in the array of roles (setRoles in before)
                    done();
                });

        })
    })

});