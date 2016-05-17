//stores functions responsible for creating user account and store user data in firebaae
(function() {
  'use strict';

  angular
    .module('enkiApp')
    .factory('commentFactory', commentFactory);

    /** @ngInject */
    commentFactory.$inject = ['$q', 'FBMSG', '$firebaseAuth', 'cacheUserFactory', 'UBASE', 'toastr', 'flagService', 'gameCacheService', '$firebaseArray'];

    function commentFactory($q, FBMSG, $firebaseAuth, cacheUserFactory, UBASE, toastr, flagService, gameCacheService, $firebaseArray) {
        var comFactVm = this,
            commentsDB,
            myDataRef;
            comFactVm.comments = [];


        comFactVm.GameIdFromService = gameCacheService.readingGameId();

        var commentFactory = {
        createCommentInDB: createCommentInDB,
        getCommentFromDB: getCommentFromDB
        };

    // var auth = $firebaseAuth(newDatabase());

        return commentFactory;

        function createCommentInDB(id, email, name, comment, date) {
            myDataRef = new Firebase(UBASE + "/game" + comFactVm.GameIdFromService.val);
            myDataRef.child(id).set({
                email: email,
                name: name,
                comment: comment,
                date: date
            });
        }

        function getCommentFromDB(gameID) {
            var defer = $q.defer();
            var firebaseRef = new Firebase(UBASE + "/game" + gameID);
            firebaseRef.on("value", function(snapshot) {
                commentsDB = $firebaseArray(firebaseRef);
                defer.resolve(commentsDB);
        }, function (errorObject) {
            console.log("The read failed: " + errorObject.code);
        });
            return defer.promise;
        }
    }

})();
