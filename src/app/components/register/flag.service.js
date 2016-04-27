(function() {
  'use strict';

  angular
      .module('enkiApp')
      .service('flagService', flagService);

  /** @ngInject */

    function flagService() {

        var flagVm = this;

        flagVm.updateFlag = updateFlag;
        flagVm.updateLogoutBtnFlag = updateLogoutBtnFlag;

        flagVm.formFlag = {val:false};
        flagVm.logoutBtnFlag = {val:false};

        function updateFlag() {
            flagVm.formFlag.val = !flagVm.formFlag.val;

        }

        function updateLogoutBtnFlag() {
            flagVm.logoutBtnFlag.val = !flagVm.logoutBtnFlag.val;
        }

    }

})();
