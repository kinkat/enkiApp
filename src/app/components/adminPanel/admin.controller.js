// holds function to save comments in database and render comments table in gamepanel

(function() {
  'use strict';

  angular
    .module('enkiApp')
    .controller('AdminController', AdminController);

    AdminController.$inject = ['authFactory', 'flagService', 'QBASE', '$location', 'cacheUserFactory', '$firebaseArray','toastr', 'FBMSG'];

  /** @ngInject */

    function AdminController(authFactory, flagService, QBASE, $location, cacheUserFactory, $firebaseArray, toastr, memoQuiz, FBMSG) {
        var vm = this,
            firebaseQuestions  = new Firebase(QBASE);

        vm.question = "";
        vm.option0 = "";
        vm.option1 = "";
        vm.option2 = "";
        vm.option3 = "";
        vm.answer = -1;
        vm.questionsArray = getQuestionsFromDB();

        vm.createQuestionInDB = createQuestionInDB;
        vm.sendQuestion = sendQuestion;
        vm.getQuestionsFromDB = getQuestionsFromDB;
        vm.uniqueId = uniqueId;
        vm.deleteQuestion = deleteQuestion;

        init()

        function init(){
            getQuestionsFromDB();
        }

        function createQuestionInDB(question, option0, option1, option2, option3, answer) {
            var id = uniqueId();
            var myDataRef = new Firebase(QBASE);
            myDataRef.child(id).set({
                id: id,
                question: question,
                option0: option0,
                option1: option1,
                option2: option2,
                option3: option3,
                answer: answer
            });

        }


        function sendQuestion() {
            if(vm.answer === -1){
                toastr.error("Good answer isn't checked! ");
                return;
            }else{
                createQuestionInDB(vm.question, vm.option0, vm.option1, vm.option2, vm.option3, vm.answer);
                vm.question = "";
                vm.option0 = "";
                vm.option1 = "";
                vm.option2 = "";
                vm.option3 = "";
                vm.answer = "";
            }
        }

        function getQuestionsFromDB() {
            firebaseQuestions.on("value", function(snapshot) {
              vm.questionsArray = snapshot.val();
            }, function (errorObject) {
              console.log("The read failed: " + errorObject.code);
            });
        }

        function deleteQuestion(question) {
            var questionIdToDelete = question.id;
            var refFirebase = new Firebase(QBASE + questionIdToDelete);
            refFirebase.remove();

        }

        function uniqueId() {
            return 'id-' + Math.random().toString(36).substr(2, 16);
        };


    }

})();
