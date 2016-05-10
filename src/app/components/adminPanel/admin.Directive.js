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
            templateUrl: 'app/components/adminPanel/adminPanel.html',
            require: '^memoryGame',
            link: function(scope, elem, attrs, memoCtrl){
                scope.addNewQuestion = function(){

                };

            }
        };
    return directive;
    }

})();