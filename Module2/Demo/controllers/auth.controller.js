function AuthController(){

    var roles;
    function setRoles(role){
        roles = role;
    }
    function isAuthorized(neededRole){
        return roles.indexOf(neededRole) >= 0; 
    }

    function isAuthorizedAsync(neededRole, cb){
        setTimeout(function(){ // set time out
            cb(roles.indexOf(neededRole) >= 0) // call the call back when timeout is
        }, 1000);
    }
    return {isAuthorized, isAuthorizedAsync, setRoles};
}

module.exports = AuthController();