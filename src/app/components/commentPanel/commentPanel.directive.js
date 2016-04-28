(function() {
  'use strict';

  angular
    .module('enkiApp')
    .directive('commentPanel', commentPanel);

  /** @ngInject */
  function commentPanel() {
    var directive = {
      restrict: 'EA',
      templateUrl: 'app/components/commentPanel/commentPanel.html',
      controller: 'comPanelController',
      controllerAs: 'comPanelCtrl'
    };

    return directive;
  }

})();
