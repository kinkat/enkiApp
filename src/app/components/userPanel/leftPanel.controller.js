(function() {
  'use strict';

  angular
    .module('enkiApp')
    .controller('LeftPanelController', LeftPanelController);

    LeftPanelController.$inject = ['FBMSG', 'authFactory', 'cacheUserFactory', '$firebaseArray', 'memoCards', '$route'];

  /** @ngInject */
  function LeftPanelController(FBMSG, authFactory, cacheUserFactory, $firebaseArray, memoCards, $route) {
    var leftPanVm = this,
        firebaseRef  = new Firebase(FBMSG);

        leftPanVm.showclickedValue = showclickedValue;
        leftPanVm.gameVal;

    leftPanVm.users = [];
    leftPanVm.users = $firebaseArray(firebaseRef);

    firebaseRef.onAuth(authFactory.checkStatus);

    leftPanVm.userInfo = {};

    leftPanVm.leaderName = [];
    leftPanVm.leaderPoints = [];

    function showclickedValue(cardValHtml) {
        memoCards.generateDeck(cardValHtml);
    }

     cacheUserFactory.readCacheUserId()
        .then(function(userId){
            authFactory.getUserData(userId)
                .then(function(UserDataObj){
                    leftPanVm.userInfo = UserDataObj;
                });
        });
  }

})();
