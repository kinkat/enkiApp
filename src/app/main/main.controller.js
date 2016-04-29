(function() {
  'use strict';

  angular
    .module('enkiApp')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController(FBMSG, authFactory) {
    var vm = this,
        firebaseRef = new Firebase(FBMSG);

        firebaseRef.onAuth(authFactory.checkStatus);

  }

})();
