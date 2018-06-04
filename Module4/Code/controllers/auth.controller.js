function AuthController() {

    var roles = ''; // indexOf was not working at line 24 without initializing this to an empty string
    var user = ''; // needed this fore user.roles to work, otherwise 'undefined'
    function setRoles(role) { //  passing in an array of roles
        roles = role; // set roles as the passed in array
        user.roles = role; // set 'something?' as  the passed in array
    }
    function setUser(inUser) {
        user = inUser;
    }
    function isAuthorized(neededRole) { // check if the user is authorized
        if (user) {
            return user.isAuthorized(neededRole);
        }

    }

    function isAuthorizedAsync(neededRole, cb) {
        setTimeout(function () { cb(roles.indexOf(neededRole) >= 0) }, 0);
    }
    function isAuthorizedPromise(neededRole, cb) {
        return new Promise(function (resolve) {
            setTimeout(function () { resolve(roles.indexOf(neededRole) >= 0) }, 0);
        });
    }
    function getIndex(req, res) {
        try {
            if (req.user.isAuthorized('admin')) {
                return res.render('index');
            }
            res.render('notAuth');
        } catch (e) {
            res.render('error');
        }
    }
    return {
        isAuthorized, isAuthorizedAsync, setRoles, setUser,
        isAuthorizedPromise, getIndex
    };
}

module.exports = AuthController();