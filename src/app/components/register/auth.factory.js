(function() {
  'use strict';

  angular
    .module('enkiApp')
    .factory('authFactory', authFactory);

    /** @ngInject */
    authFactory.$inject = ['FBMSG'];

    function authFactory(FBMSG) {

      var authFactory = {addUser: addUser};

      var myDataRef = new Firebase(FBMSG);


        return authFactory;

        function addUser(name, email, password, points) {

            myDataRef.createUser({
                email    : email,
                password : password

            }, function(error, userData) {
                if (error) {

                    console.log("Error creating user:", error);

                } else {

                console.log("Successfully created user account with uid:", userData.uid);

                    myDataRef.child(userData.uid).set({

                        name: name,
                        email: email,
                        points: points

                    });

                }

            });

        }

    };


})();
