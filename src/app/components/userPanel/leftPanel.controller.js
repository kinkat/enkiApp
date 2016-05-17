//stores function to render logged user view with data from firebase

(function() {
  'use strict';

  angular
    .module('enkiApp')
    .controller('LeftPanelController', LeftPanelController);

    LeftPanelController.$inject = ['FBMSG', 'authFactory', 'cacheUserFactory', '$firebaseArray'];

  /** @ngInject */
  function LeftPanelController(FBMSG, authFactory, cacheUserFactory, $firebaseArray) {
    var leftPanVm = this,
        firebaseRef  = new Firebase(FBMSG);

    leftPanVm.users = [];
    leftPanVm.leaderName = [];
    leftPanVm.leaderPoints = [];
    leftPanVm.userInfo = {};

    leftPanVm.users = $firebaseArray(firebaseRef);

    firebaseRef.onAuth(authFactory.checkStatus);

    cacheUserFactory.readCacheUserId()
        .then(function(userId){
            authFactory.getUserData(userId)
                .then(function(UserDataObj){
                  leftPanVm.userInfo = UserDataObj;
                });
        });
  }

})();
