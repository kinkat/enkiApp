//stores functions to register and login user
(function() {
  'use strict';

  angular
    .module('enkiApp')
    .controller('RegisterController', RegisterController);

  /** @ngInject */
  RegisterController.$inject = ["$route", "$location", "FBMSG", "authFactory", "cacheUserFactory", "flagService", "toastr", "errorService"]

  function RegisterController($route, $location, FBMSG, authFactory, cacheUserFactory, flagService, toastr, errorService) {
    var vm = this;

    vm.signUp = signUp;
    vm.submitLoginForm = submitLoginForm;
    vm.submitForm = submitForm;

    vm.flag = flagService.formFlag;
    // vm.flagBtn = flagService.logoutBtnFlag;

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
            toastr.success("Successfully created user account");
            authFactory.createRecordInDB(userData.uid, vm.email, vm.name, vm.points);
            vm.email ="";
            vm.name = "";
            vm.password = "";
            showRegisterForm();
        }, function(error) {
            errorService.checkRegisterError(error);
        });
    }

    function logUser(){
        var result = authFactory.authUser(vm.loginEmail, vm.loginPassword);
        result.then(function(authData){
            vm.authData = authData;
            cacheUserFactory.cachingUserId(authData.uid);
            console.log("Authenticated successfully with payload:", authData.uid);
            $location.path("/gamepanel");

        }, function(error) {
            errorService.checkLoginError(error);

        })
    }

  }

})();
