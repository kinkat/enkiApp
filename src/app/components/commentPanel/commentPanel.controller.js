// holds function to save comments in database and render comments table in gamepanel

(function() {
  'use strict';

  angular
    .module('enkiApp')
    .controller('comPanelController', comPanelController);

    comPanelController.$inject = ['authFactory', 'flagService', 'UBASE', '$location', 'cacheUserFactory', '$firebaseArray'];

  /** @ngInject */

    function comPanelController(authFactory, flagService, UBASE, $location, cacheUserFactory, $firebaseArray) {

        var comPanelVm = this,
            firebaseRef = new Firebase(UBASE);
            comPanelVm.name = "";
            comPanelVm.email = "";
            comPanelVm.comment = '';
            comPanelVm.data;
            comPanelVm.uniqueId = uniqueId;
            comPanelVm.comments = [];

            var userId;

            comPanelVm.submitCommentForm = submitCommentForm;
            comPanelVm.sendComment = sendComment;
            comPanelVm.setToPristine = setToPristine;


        function setToPristine(form) {
            authFactory.resetForm(form);
        }

        //generete comment ID
        function uniqueId() {
            console.log('id-' + Math.random().toString(36).substr(2, 16));
            return 'id-' + Math.random().toString(36).substr(2, 16);
        };

        function submitCommentForm(isValid) {
            if (isValid) {
                comPanelVm.sendComment();
            }
        }

        //stores data in firebase
        function sendComment() {
            comPanelVm.data = Date.now();
            userId = comPanelVm.uniqueId();
            authFactory.createCommentInDB(userId, comPanelVm.name, comPanelVm.email, comPanelVm.comment, comPanelVm.data);
            comPanelVm.name = "";
            comPanelVm.email = "";
            comPanelVm.comment = "";
        }


        //get commnents list from Firebase
        firebaseRef.on("value", function(snapshot) {
            comPanelVm.comments = $firebaseArray(firebaseRef);
        }, function (errorObject) {
                console.log("The read failed: " + errorObjkiect.code);
        });

    }

})();
