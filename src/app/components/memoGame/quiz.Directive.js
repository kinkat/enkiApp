(function() {
  'use strict';

  angular
    .module('enkiApp')
    .directive('quizDirective', quizDirective);

  /** @ngInject */
  function quizDirective() {
    var directive = {
      restrict: 'EA',
      templateUrl: 'app/components/memoGame/quizTemplate.html'
    };

    return directive;
  }

})();