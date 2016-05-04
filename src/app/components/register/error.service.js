//stores sign in and sign up error codes

(function() {
  'use strict';

  angular
      .module('enkiApp')
      .service('errorService', errorService);


    errorService.$inject = ['toastr'];
  /** @ngInject */

    function errorService(toastr) {

        var errorVm = this;

        errorVm.checkLoginError = checkLoginError;
        errorVm.checkRegisterError = checkRegisterError;

        function checkLoginError(error) {
            switch (error.code) {
                case "INVALID_EMAIL":
                    toastr.error("The specified user account email is invalid.");
                    break;
                case "INVALID_PASSWORD":
                    toastr.error("The specified user account password is incorrect.");
                    break;
                case "INVALID_USER":
                    toastr.error("The specified user account does not exist.");
                    break;
                case "NETWORK_ERRORR":
                    toastr.error("Server error.");
                    break;
                  case "USER_DENIED":
                    toastr.error("User denied.");
                    break;

                default:
                    toastr.error("Error logging user in:", error);
            }
        }

        function checkRegisterError(error) {
            switch (error.code) {
                case "EMAIL_TAKEN":
                    toastr.error("The specified user account is already in use.");
                    break;
                case "NETWORK_ERRORR":
                    toastr.error("Server error.");
                    break;

                default:
                    toastr.error("Error logging user in:", error);
            }
        }

    }

})();
