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

    /** @ngInject */

    // function NavbarController(moment) {
    //   var vm = this;

    //   // "vm.creationDate" is available by directive option "bindToController: true"
    //   vm.relativeDate = moment(vm.creationDate).fromNow();
    // }
  }

})();
