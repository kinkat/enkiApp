(function() {
  'use strict';

  angular
    .module('enkiApp')
    .controller('comPanelController', comPanelController);

    comPanelController.$inject = ['authFactory', 'flagService', 'UBASE', '$location', 'cacheUserFactory', '$firebaseArray'];

  /** @ngInject */

    function comPanelController(authFactory, flagService, UBASE, $location, cacheUserFactory, $firebaseArray ) {

        var comPanelVm = this,
            firebaseRef = new Firebase(UBASE);
            comPanelVm.name = "";
            comPanelVm.email = "";
            comPanelVm.comment = '';
            comPanelVm.uniqueId = uniqueId;
            comPanelVm.comments = [];

            var userId;


            comPanelVm.submitCommentForm = submitCommentForm;
            comPanelVm.showCommentButton = showCommentButton;
            comPanelVm.sendComment = sendComment;
            comPanelVm.setToPristine = setToPristine;


        function showCommentButton() {
            flagService.updateLogoutBtnFlag();

        }

        function setToPristine(form) {
            authFactory.resetForm(form);
            console.log("hej");
        }


        function uniqueId() {
            console.log('id-' + Math.random().toString(36).substr(2, 16));
            return 'id-' + Math.random().toString(36).substr(2, 16);
        };

        function submitCommentForm(isValid) {
            if (isValid) {
                comPanelVm.sendComment();
            }
        }

        function sendComment() {
            userId = comPanelVm.uniqueId();
            authFactory.createCommentInDB(userId, comPanelVm.name, comPanelVm.email, comPanelVm.comment);
            comPanelVm.name = "";
            comPanelVm.email = "";
            comPanelVm.comment = "";
        }

        firebaseRef.on("value", function(snapshot) {
            comPanelVm.comments = $firebaseArray(firebaseRef);
        }, function (errorObject) {
                console.log("The read failed: " + errorObject.code);
        });

    }

})();
