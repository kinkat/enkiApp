//stores functions responsible for creating user account and store user data in firebaae
(function() {
  'use strict';

  angular
    .module('enkiApp')
    .factory('authFactory', authFactory);

    /** @ngInject */
    authFactory.$inject = ['$q', 'FBMSG', '$firebaseAuth', 'cacheUserFactory', 'UBASE', 'toastr', 'flagService', 'gameCacheService'];

    function authFactory($q, FBMSG, $firebaseAuth, cacheUserFactory, UBASE, toastr, flagService, gameCacheService) {
        var vm = this;
        vm.authData;
        vm.showUserInfo = cacheUserFactory.readCacheFlag();
        vm.showLogoutButton = flagService.updateLogoutBtnFlag();
        vm.GameIdFromService = gameCacheService.readingGameId();
        vm.isAdmin = false;

        var UserDataObj = {},
            userURL,
            myDataRef;

    //Initialize FirebaseAuth
      var authFactory = {
        addUser: addUser,
        authUser: authUser,
        auth: auth,
        newDatabase: newDatabase,
        getUserData:getUserData,
        createRecordInDB : createRecordInDB,
        checkStatus: checkStatus,
        resetForm: resetForm,
        areYouAdmin: areYouAdmin
    };

    var auth = $firebaseAuth(newDatabase());

        return authFactory;

    // Create user account

        function addUser(email, password) {
            return auth.$createUser({
                email    : email,
                password : password
            });
        }

    //User authentication

        function authUser(email, password) {
            return auth.$authWithPassword({
                email    : email,
                password : password
            });
        }

        function newDatabase () {
            myDataRef = new Firebase(FBMSG);
            return myDataRef;
        }

        function auth() {
            return auth;
        }

        function resetForm(form){
            form.$setPristine();
        }

// gets user data from firebase, is called in userpanel to render view
        function getUserData(id) {
            var defer = $q.defer();
            userURL = new Firebase(FBMSG + id);
            userURL.once("value", function(snapshot){
                var nameSnapshot = snapshot.child("name");
                var pointsSnapshot = snapshot.child("points");
                var emailSnapshot = snapshot.child("email");

                if(!!snapshot.child("admin").val()) {
                    vm.isAdmin = true;
                }

                UserDataObj['userNameFromDataBase'] = nameSnapshot.val();
                UserDataObj['pointsFromDataBase'] = pointsSnapshot.val();
                UserDataObj['emailFromDataBase'] = emailSnapshot.val();
                UserDataObj['isAdmin'] = vm.isAdmin;

                defer.resolve(UserDataObj);
            });
            return defer.promise;
        }
        //creates user record in database, basic points are set to 0
        function createRecordInDB(id, email, name, points) {
            myDataRef = new Firebase(FBMSG);
            myDataRef.child(id).set({
                email: email,
                name: name,
                points: points
            });
        }

        function checkStatus(authData) {
        if (authData) {
            console.log("User " + authData.uid + " is logged in with " + authData.provider);
            vm.authData = authData;
            vm.showUserInfo = true;
            flagService.logoutBtnFlag.val = true;
            cacheUserFactory.cachingUserId(authData.uid);

        } else {
            vm.showUserInfo = false;
            flagService.logoutBtnFlag.val = false;
            vm.isAdmin = false;
            toastr.error("User is logged out");
        }
    }

        function areYouAdmin($location){
            var firebaseRef = new Firebase(FBMSG),
                check = $q.defer();

            firebaseRef.onAuth(authFactory.checkStatus);
            cacheUserFactory.readCacheUserId()
                .then(function(userId){
                authFactory.getUserData(userId)
                .then(function(UserDataObj){
                    if(UserDataObj.isAdmin){
                        check.resolve();
                    } else {
                        toastr.error("You don't have permission to access" );
                        check.reject();
                    }
                });
            });
            return check.promise;
        }


    }

})();
