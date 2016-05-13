(function() {
  'use strict';

  angular
    .module('enkiApp')
    .directive('adminDirective', adminDirective);

  /** @ngInject */
    function adminDirective(memoQuiz) {
        var directive = {
            restrict: 'E',
            scope:{},
            templateUrl: 'app/components/adminPanel/question.html',
            require: '^memoryGame'

        };
    return directive;
    }

})();