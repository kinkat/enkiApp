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
        auth: auth
    };

      var myDataRef = new Firebase(FBMSG);

      var auth = $firebaseAuth(myDataRef);

      console.log(auth);
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

        function auth() {
            return auth;
        };


    };


})();



