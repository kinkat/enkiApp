(function() {
  'use strict';

  angular
    .module('enkiApp')
    .factory('authFactory', authFactory);

    /** @ngInject */
    authFactory.$inject = ['FBMSG', '$firebaseAuth'];

    function authFactory(FBMSG, $firebaseAuth) {

    var UserDataObj = {},
        userURL,
        myDataRef,
        email,
        name,
        points;

    //Initialize FirebaseAuth
      var authFactory = {
        addUser: addUser,
        authUser: authUser,
        auth: auth,
        newDatabase: newDatabase,
        getUserData:getUserData,
        createRecordInDB : createRecordInDB

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

            userURL = new Firebase(FBMSG + id);
            userURL.once("value", function(snapshot){
                var nameSnapshot = snapshot.child("name");
                var pointsSnapshot = snapshot.child("points");
                var emailSnapshot = snapshot.child("email");

                UserDataObj['userNameFromDataBase'] = nameSnapshot.val();
                UserDataObj['pointsFromDataBase'] = pointsSnapshot.val();
                UserDataObj['emailFromDataBase'] = emailSnapshot.val();
                console.log(UserDataObj);
            });
            return UserDataObj;
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


    };

})();



