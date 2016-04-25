(function() {
  'use strict';

  angular
    .module('enkiApp')
    .factory('authFactory', authFactory);

    /** @ngInject */
    authFactory.$inject = ['FBMSG', '$firebaseAuth'];

    function authFactory(FBMSG, $firebaseAuth) {


    //Initialize FirebaseAuth
      var authFactory = {
        addUser: addUser,
        authUser: authUser,
        auth: auth,
        newDatabase: newDatabase

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

        // function newUser (email, name, points) {

        // }

        //         firebaseRef.child(userData.uid).set({
        //         email:email,
        //         name: name,
        //         points: points
        //     });

        function newDatabase () {
            var myDataRef = new Firebase(FBMSG);
            return myDataRef;
        }

        function auth() {
            return auth;
        };

    };

})();



