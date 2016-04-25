(function() {
  'use strict';

  angular
    .module('enkiApp')
    .directive('leftPanel', leftPanel);

  /** @ngInject */
  function leftPanel() {
    var directive = {
      restrict: 'EA',
      templateUrl: 'app/components/userPanel/leftPanel.html'
    };

    return directive;
  }

})();
