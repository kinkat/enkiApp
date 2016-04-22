(function() {
  'use strict';

  angular
    .module('enkiApp')
    .directive('acmeNavbar', acmeNavbar);

  /** @ngInject */
  function acmeNavbar() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/navbar/navbar.html'
      // scope: {
      //     creationDate: '='
      // },
      // controller: MainController,
      // controllerAs: 'vm',
      // bindToController: true
    };

    return directive;
  }

})();
