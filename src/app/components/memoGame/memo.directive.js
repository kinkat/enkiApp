(function() {
  'use strict';

  angular
    .module('enkiApp')
    .directive('memoryGame', memoryGame);

  /** @ngInject */
  function memoryGame() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/memoGame/memo.html'

    };

    return directive;

  }

})();
