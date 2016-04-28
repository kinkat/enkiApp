(function() {
  'use strict';

  angular
    .module('enkiApp')
    .controller('comPanelController', comPanelController);

    comPanelController.$inject = ['authFactory', 'flagService', 'UBASE', '$location', 'cacheUserFactory'];

  /** @ngInject */

    function comPanelController(authFactory, flagService, UBASE, $location, cacheUserFactory ) {

        var comPanelVm = this,
            firebaseRef = new Firebase(UBASE);
            comPanelVm.name = "";
            comPanelVm.email = "";
            comPanelVm.comment = '';
            comPanelVm.uniqueId = uniqueId;

            var userId;


            comPanelVm.submitCommentForm = submitCommentForm;
            comPanelVm.showCommentButton = showCommentButton;
            comPanelVm.sendComment = sendComment;


        function showCommentForm() {
            flagService.updateCommentFlag();
        }

        function showCommentButton() {
        flagService.updateLogoutBtnFlag();

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
        }

         // cacheUserFactory.readCacheUserId()
         // .then(function(id) {
         //    userId = id;
         //    comPanelVm.sendComment();
         // });
    }

})();
