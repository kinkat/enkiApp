(function() {
  'use strict';

  angular
    .module('enkiApp')
    .directive('welcomePanel', welcomePanel);

  /** @ngInject */
  function welcomePanel() {
    var directive = {
      restrict: 'EA',
      templateUrl: 'app/components/welcomePanel/welcome.html'
    };

    return directive;
  }

})();