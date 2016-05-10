(function() {
  'use strict';

  angular
    .module('enkiApp')
    .directive('quizDirective', quizDirective);

  /** @ngInject */
    function quizDirective(memoQuiz) {
        var directive = {
            restrict: 'E',
            scope:{},
            templateUrl: 'app/components/quiz/quizTemplate.html',
            require: '^memoryGame',
            link: function(scope, elem, attrs, memoCtrl){
                scope.start = function(){
                    scope.id = 0;
                    scope.quizOver = false;
                    scope.inProgress  = true;
                    scope.getQuestion();
                };

                scope.reset = function() {
                    scope.inProgress = false;
                    scope.score = 0;
                    memoCtrl.rankPoints = scope.score;
                };

                scope.getQuestion = function(){
                    var q = memoQuiz.getQuestion(scope.id);

                    var options= [];
                    options[0] = q.option0;
                    options[1] = q.option1;
                    options[2] = q.option2;
                    options[3] = q.option3;

                    if(q) {
                        scope.question = q.question;
                        scope.options = options;
                        scope.answer = q.answer;
                        scope.answerMode = true;
                    } else {
                        memoCtrl.rankPoints = scope.score;
                        scope.quizOver = true;
                        memoCtrl.updatePoints();

                    }
                };

                scope.checkAnswer = function() {
                    if(!angular.element(document.querySelectorAll('input[name=answer]:checked')).length) return;
                    var a = angular.element(document.querySelectorAll('input[name=answer]:checked'));
                    var ans = (a[0].defaultValue);

                    if(ans == scope.options[scope.answer]) {
                        scope.score++;
                        scope.correctAns = true;
                    } else {
                        scope.correctAns = false;
                    }
                    scope.answerMode = false;
                };
     
                scope.nextQuestion = function() {
                    scope.id++;
                    scope.getQuestion();
                }
                scope.reset();
            }
        };
    return directive;
    }

})();