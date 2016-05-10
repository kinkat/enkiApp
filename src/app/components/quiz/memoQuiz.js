//stores info about QUIZ card

(function() {
  'use strict';

  angular
      .module('enkiApp')
      .factory('memoQuiz', function(QBASE, $firebaseArray){

            var firebaseQuestions = new Firebase(QBASE),
                questions = angular.fromJson($firebaseArray(firebaseQuestions));

            return {
                getQuestion: function(id) {
                        if(id < questions.length) {
                            return questions[id];
                        } else {
                            return false;
                        }
                },
            };

        })

})();
