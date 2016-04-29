(function() {
  'use strict';

  angular
    .module('enkiApp')
    .factory('authFactory', authFactory);

    /** @ngInject */
    authFactory.$inject = ['$q', 'FBMSG', '$firebaseAuth', 'cacheUserFactory', 'UBASE'];

    function authFactory($q, FBMSG, $firebaseAuth, cacheUserFactory, UBASE) {
        var vm = this;
        vm.authData;
        vm.showUserInfo = cacheUserFactory.readCacheFlag();

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
        createCommentInDB: createCommentInDB

    };

    var auth = $firebaseAuth(newDatabase());

        return authFactory;

    // Create user account

        function addUser(email, password) {

            return auth.$createUser({
                email    : email,
                password : password
            });
        };

    //User authentication

        function authUser(email, password) {

            return auth.$authWithPassword({
                email    : email,
                password : password
            });
        };


        function newDatabase () {
            myDataRef = new Firebase(FBMSG);
            return myDataRef;
        }

        function auth() {
            return auth;
        };

        function getUserData(id) {
            var defer = $q.defer();
            userURL = new Firebase(FBMSG + id);
            userURL.once("value", function(snapshot){
                var nameSnapshot = snapshot.child("name");
                var pointsSnapshot = snapshot.child("points");
                var emailSnapshot = snapshot.child("email");

                UserDataObj['userNameFromDataBase'] = nameSnapshot.val();
                UserDataObj['pointsFromDataBase'] = pointsSnapshot.val();
                UserDataObj['emailFromDataBase'] = emailSnapshot.val();
                defer.resolve(UserDataObj);
            });
            return defer.promise;
        }

        function createRecordInDB(id, email, name, points) {
            myDataRef = new Firebase(FBMSG);
            console.log(myDataRef.child(id));
            myDataRef.child(id).set({
                email: email,
                name: name,
                points: points
            });

        }


        function createCommentInDB(id, email, name, comment) {
            myDataRef = new Firebase(UBASE);

            myDataRef.child(id).set({
                email: email,
                name: name,
                comment: comment
            });

        }

        function checkStatus(authData) {
        if (authData) {
            console.log("User " + authData.uid + " is logged in with " + authData.provider);
            vm.authData = authData;
            vm.showUserInfo = true;
            cacheUserFactory.cachingUserId(authData.uid);

        } else {
            vm.showUserInfo = false;
            console.log("User is logged out");
        }
    }

    }

})();



