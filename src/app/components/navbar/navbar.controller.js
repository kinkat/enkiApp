

(function() {
  'use strict';

  angular
    .module('enkiApp')
    .controller('NavbarController', NavbarController);

    NavbarController.$inject = ['authFactory', 'flagService', 'FBMSG', '$location'];

  /** @ngInject */

    function NavbarController(authFactory, flagService, FBMSG, $location) {

        var navbarVm = this,
            firebaseRef = new Firebase(FBMSG);

        navbarVm.logOut = logOut;

        navbarVm.showRegisterForm = showRegisterForm;
        navbarVm.showLogoutButton = showLogoutButton;

        navbarVm.flag = flagService.formFlag.val;
        console.log(flagService.logoutBtnFlag.val);
        navbarVm.flagBtn = flagService.logoutBtnFlag.val;

        function showLogoutButton() {
            flagService.updateLogoutBtnFlag();
        }

        function showRegisterForm() {
            flagService.updateFlag();
        }

        function logOut(){
            firebaseRef.unauth();
            showLogoutButton();
            $location.path("/start");

        }

    }

})();
