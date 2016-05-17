// holds function to save comments in database and render comments table in gamepanel

(function() {
  'use strict';

  angular
    .module('enkiApp')
    .controller('comPanelController', comPanelController);

    comPanelController.$inject = ['authFactory', 'flagService', 'UBASE', '$location', 'cacheUserFactory', '$firebaseArray', 'commentFactory', 'helpersFactory', 'gameCacheService'];

  /** @ngInject */

    function comPanelController(authFactory, flagService, UBASE, $location, cacheUserFactory, $firebaseArray, commentFactory, helpersFactory, gameCacheService) {

        var comPanelVm = this;

            comPanelVm.name = "";
            comPanelVm.email = "";
            comPanelVm.comment = '';
            comPanelVm.data;
            comPanelVm.comments = [];
            comPanelVm.submitCommentForm = submitCommentForm;
            comPanelVm.sendComment = sendComment;
            comPanelVm.setToPristine = setToPristine;

            comPanelVm.GameIdFromService = gameCacheService.readingGameId();
            comPanelVm.comments = commentFactory.getCommentFromDB();

        function setToPristine(form) {
            authFactory.resetForm(form);
        }

        function submitCommentForm(isValid) {
            if (isValid) {
                comPanelVm.sendComment();
            }
        }

        // stores data in firebase
        function sendComment() {
            var commentId;
            comPanelVm.data = Date.now();
            commentId = helpersFactory.generateUniqueId();
            commentFactory.createCommentInDB(commentId, comPanelVm.name, comPanelVm.email, comPanelVm.comment, comPanelVm.data);
            comPanelVm.name = "";
            comPanelVm.email = "";
            comPanelVm.comment = "";
        }

        commentFactory.getCommentFromDB(comPanelVm.GameIdFromService.val)
            .then(function(commentsDB){
                comPanelVm.comments = commentsDB;
            });
    }

})();
