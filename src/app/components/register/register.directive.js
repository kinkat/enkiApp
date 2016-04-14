(function() {
  'use strict';

  angular
    .module('enkiApp')
    .directive('enkiRegister', enkiRegister);

  /** @ngInject */
  function enkiRegister() {
    var directive = {
      restrict: 'EA',
      templateUrl: 'app/components/register/register.html'
    };

    return directive;
  }

})();
