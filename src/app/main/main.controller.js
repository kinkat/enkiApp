(function() {
  'use strict';

  angular
    .module('enkiApp')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($location, memoCards, FBMSG, authFactory, $firebaseArray, cacheUserFactory) {
    var vm = this,
        firebaseRef  = new Firebase(FBMSG);


    vm.showRegisterVal = false;

    vm.logOut = logOut;
    vm.showRegisterForm = showRegisterForm;
    vm.signUp = signUp;
    vm.checkStatus = checkStatus;
    vm.submitLoginForm = submitLoginForm;
    vm.submitForm = submitForm;

    //USER
    vm.authData;
    vm.users = [];
    vm.newUser = {};
    vm.name = "";
    vm.email = "";
    vm.points = 0;
    vm.password = "";

    vm.showUserInfo = cacheUserFactory.readCacheFlag();
    vm.showLogoutButton = cacheUserFactory.readLogoutFlag();

    vm.loginName = "";
    vm.loginEmail ="";
    vm.loginPassword ="";
    vm.logUser = logUser;

    vm.leaderName = [];
    vm.leaderPoints = [];


    vm.users = $firebaseArray(firebaseRef);

    firebaseRef.onAuth(checkStatus);

    //MAIN FUNCTIONS

    function showRegisterForm(){
        vm.showRegisterVal = !vm.showRegisterVal;
    }

    //FORM FUNCTIONS

    function submitForm(isValid) {
        if (isValid) {
            signUp();
        }
    }

    function submitLoginForm(isValid) {
        if (isValid) {
            logUser();
        }
    }

    function signUp(){
        var result = authFactory.addUser(vm.email, vm.password);
        result.then(function(userData){
            console.log(userData);
            console.log("Successfully created user account with uid:", userData.uid);
            authFactory.createRecordInDB(userData.uid, vm.email, vm.name, vm.points); // przy wylowaniu podac argumenty email name points, refactor!

        }, function(error) {
            console.log("Error creating user:", error);
        });
    }

    function logUser(){
        var result = authFactory.authUser(vm.loginEmail, vm.loginPassword);
        result.then(function(authData){
            vm.authData = authData;
            cacheUserFactory.cachingUserId(authData.uid);
            showRegisterForm();
            console.log("Authenticated successfully with payload:", authData.uid);
            $location.path("/gamepanel");

        }, function(error) {
            console.log("Login failed:", error);
        })
    }

    function logOut(){
        firebaseRef.unauth();
        $location.path("/");
    }


    function checkStatus(authData) {
        if (authData) {
            console.log("User " + authData.uid + " is logged in with " + authData.provider);
            vm.authData = authData;
            vm.showUserInfo = true;
            vm.showLogoutButton = true;
            cacheUserFactory.cachingUserFlag(vm.showUserInfo);
        } else {
            vm.showUserInfo = false;
            console.log("User is logged out");
        }
    }

  }

})();
