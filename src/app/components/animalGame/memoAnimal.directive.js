(function() {
  'use strict';

  angular
    .module('enkiApp')
    .directive('memoryAnimalGame', memoryAnimalGame);

  /** @ngInject */
  function memoryAnimalGame() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/animalGame/animalMemo.html'

    };

    return directive;

  }

})();
