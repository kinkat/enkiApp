(function() {
  'use strict';

  angular
    .module('enkiApp')
    .controller('RegisterController', RegisterController);

  /** @ngInject */
  function RegisterController($route, $location, FBMSG, authFactory, cacheUserFactory, flagService) {
    var vm = this;



    vm.signUp = signUp;
    vm.submitLoginForm = submitLoginForm;
    vm.submitForm = submitForm;
    vm.showLogoutButton = showLogoutButton;

    vm.flag = flagService.formFlag;
    vm.flagBtn = flagService.logoutBtnFlag;

    //USER
    vm.authData;
    vm.newUser = {};
    vm.name = "";
    vm.email = "";
    vm.points = 0;
    vm.password = "";

    vm.loginName = "";
    vm.loginEmail ="";
    vm.loginPassword ="";
    vm.logUser = logUser;
    vm.setToPristine = setToPristine;


    //MAIN FUNCTIONS

    function showRegisterForm() {
        flagService.updateFlag();
    }
    function setToPristine(form) {
      authFactory.resetForm(form);
    }

    function showLogoutButton() {
        flagService.updateLogoutBtnFlag();
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
            console.log("Successfully created user account with uid:", userData.uid);
            authFactory.createRecordInDB(userData.uid, vm.email, vm.name, vm.points);
            vm.email ="";
            vm.name = "";
            vm.password = "";
            showRegisterForm();
        }, function(error) {
            console.log("Error creating user:", error);
        });
    }

    function logUser(){
        var result = authFactory.authUser(vm.loginEmail, vm.loginPassword);
        result.then(function(authData){
            vm.authData = authData;
            cacheUserFactory.cachingUserId(authData.uid);
            console.log("Authenticated successfully with payload:", authData.uid);
            showLogoutButton();
            $location.path("/gamepanel");

        }, function(error) {
            console.log("Login failed:", error);
        })
    }

  }

})();
