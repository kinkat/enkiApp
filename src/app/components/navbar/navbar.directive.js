(function() {
  'use strict';

  angular
    .module('enkiApp')
    .directive('acmeNavbar', acmeNavbar);

  /** @ngInject */
  function acmeNavbar() {
    var directive = {
      restrict: 'EA',
      templateUrl: 'app/components/navbar/navbar.html',
      controller: 'NavbarController',
      controllerAs: 'NavbarCtrl'
    };

    return directive;
  }

})();
