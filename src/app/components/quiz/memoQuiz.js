//stores info about QUIZ card

(function() {
  'use strict';

  angular
      .module('enkiApp')
      .factory('memoQuiz', function(QBASE, $firebaseArray, $q){

            var vm = this,
                firebaseQuestions  = new Firebase(QBASE);
            var questions = angular.fromJson($firebaseArray(firebaseQuestions));

            return {
                getQuestion: function(id) {
                    console.log('ARR : ',questions);
                        if(id < questions.length) {
                            return questions[id];
                        } else {
                            return false;
                        }
                },
            };

        })

})();
