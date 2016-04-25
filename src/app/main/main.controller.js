(function() {
  'use strict';

  angular
    .module('enkiApp')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($timeout, $route, $location, memoCards, toastr, FBMSG, authFactory, $firebaseArray, cacheUserFactory, helpersFactory) {
    var vm = this;
 var i = cacheUserFactory.readCacheUserId();
 console.log(i);
    vm.showToastr = showToastr;

    vm.showRegisterVal = false;
    vm.showRegisterForm = showRegisterForm;

    //USER
    vm.users = [];
    vm.newUser = {};
    vm.name = "";
    vm.email ="";
    vm.password = "";
    vm.signUp = signUp;
    vm.showUserInfo = cacheUserFactory.readCacheFlag();
    vm.showLogoutButton = cacheUserFactory.readLogoutFlag();
    // vm.getUserId = cacheUserFactory.cachingUserId();
    // vm.shuffleCards;

    vm.submitForm = submitForm;
    vm.loginName = "";
    vm.loginEmail ="";
    vm.loginPassword ="";
    vm.logUser = logUser;
    vm.submitLoginForm = submitLoginForm;
    vm.points = 0;
    vm.checkStatus = checkStatus;

    vm.userNameFromDataBase;
    vm.pointsFromDataBase;
    vm.emailFromDataBase;
    vm.authData;
    vm.leaderName = [];
    vm.leaderPoints = [];
    vm.getUserData = getUserData;
    vm.logOut = logOut;

    vm.showLeaderBoard = showLeaderBoard;

    var firebaseRef  = new Firebase(FBMSG);
    vm.users = $firebaseArray(firebaseRef);

    firebaseRef.onAuth(checkStatus);

    //MAIN FUNCTIONS

    function showRegisterForm(){
        vm.showRegisterVal = !vm.showRegisterVal;
    }

    function showToastr() {
      toastr.info('Fork <a href="https://github.com/Swiip/generator-gulp-angular" target="_blank"><b>generator-gulp-angular</b></a>');
      vm.classAnimation = '';
    }

    function showLeaderBoard() {
        vm.userURL = new Firebase(FBMSG);
        vm.userURL.orderByChild("points").on("child_added", function(snapshot) {
            vm.leaderName = snapshot.val().name;
            vm.leaderPoints = snapshot.val().points;
            console.log(snapshot.val().name + " has " + snapshot.val().points + " points");
        });
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
            firebaseRef.child(userData.uid).set({
                email:vm.email,
                name: vm.name,
                points: vm.points
            });

        }, function(error) {
            console.log("Error creating user:", error);
        });
    }

    function logUser(){
        var result = authFactory.authUser(vm.loginEmail, vm.loginPassword);
        result.then(function(authData){
            vm.authData = authData;
            cacheUserFactory.cachingUserId(authData.uid);
            getUserData(authData.uid);
            showRegisterForm();
            console.log("Authenticated successfully with payload:", authData.uid);
            $location.path("/gamepanel");

        }, function(error) {
            console.log("Login failed:", error);
        })
    }

    function logOut(){
        firebaseRef.unauth();
        // $route.reload();
        $location.path("/");
    }

    function getUserData(id) {

        vm.userURL = new Firebase(FBMSG + id);
        vm.userURL.once("value", function(snapshot){

            var nameSnapshot = snapshot.child("name");
            vm.userNameFromDataBase = nameSnapshot.val();

            var pointsSnapshot = snapshot.child("points");
            vm.pointsFromDataBase = pointsSnapshot.val();

            var emailSnapshot = snapshot.child("email");
            vm.emailFromDataBase = emailSnapshot.val();

        });
    }

    function checkStatus(authData) {
        if (authData) {
            console.log("User " + authData.uid + " is logged in with " + authData.provider);
            vm.authData = authData;
            vm.showUserInfo = true;
            vm.showLogoutButton = true;
            cacheUserFactory.cachingUserFlag(vm.showUserInfo);
            getUserData(authData.uid);
        } else {
            vm.showUserInfo = false;
            console.log("User is logged out");
        }
    }

  }

})();
