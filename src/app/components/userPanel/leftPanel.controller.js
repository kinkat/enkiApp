(function() {
  'use strict';

  angular
    .module('enkiApp')
    .controller('LeftPanelController', LeftPanelController);

    LeftPanelController.$inject = ['FBMSG', 'authFactory', 'cacheUserFactory'];

  /** @ngInject */
  function LeftPanelController(FBMSG, authFactory, cacheUserFactory) {
    var leftPanVm = this;

    leftPanVm.userInfo = {};

    leftPanVm.showRegisterVal = false;

    leftPanVm.leaderName = [];
    leftPanVm.leaderPoints = [];

    leftPanVm.showLeaderBoard = showLeaderBoard;


    //Shows leaderboard and fill table with data from firebase

    leftPanVm.userInfo = authFactory.getUserData(cacheUserFactory.readCacheUserId());

    function showLeaderBoard() {
        leftPanVm.userURL = new Firebase(FBMSG);
        leftPanVm.userURL.orderByChild("points").on("child_added", function(snapshot) {
            leftPanVm.leaderName = snapshot.val().name;
            leftPanVm.leaderPoints = snapshot.val().points;
            console.log(snapshot.val().name + " has " + snapshot.val().points + " points");
        });
    }


  }

})();
