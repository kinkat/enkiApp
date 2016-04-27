(function() {
  'use strict';

  angular
    .module('enkiApp')
    .directive('enkiRegister', enkiRegister);

  /** @ngInject */
  function enkiRegister() {
    var directive = {
        restrict: 'EA',
        templateUrl: 'app/components/register/register.html',
        controller: 'RegisterController',
        controllerAs: 'RegisterCtrl'
    };

    return directive;
  }

})();
