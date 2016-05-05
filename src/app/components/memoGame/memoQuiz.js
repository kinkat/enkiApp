//stores info about QUIZ card

(function() {
  'use strict';

  angular
      .module('enkiApp')
      .service('memoQuiz', memoQuiz);

  /** @ngInject */
  function memoQuiz() {
    var vm = this;
    vm.showQuiz = showQuiz;

    vm.selectedAnswers = {};

    vm.questions = [{
      'title': 'Question 1 ?',
      'answers': [{
        'title': 'Answer 1',
        'correct': false,
      }, {
        'title': 'Answer 2',
        'correct': true,
      }]
    }, {
      'title': 'Question 2 ?',
      'answers': [{
        'title': 'Answer 1',
        'correct': false,
      }, {
        'title': 'Answer 2',
        'correct': true,
      }]
    }];

    vm.validate = function() {
      vm.correctAnswers = 0;
      vm.totalQuestions = vm.questions.length;

      for (var answer in vm.selectedAnswers) {
        answerObj = vm.selectedAnswers[answer]
        if (answerObj.correct) {
          vm.correctAnswers += 1;
        }
      }



    }

    function showQuiz() {
      console.log('showQuiz');
    }

  }

})();
