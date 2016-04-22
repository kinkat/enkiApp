(function() {
  'use strict';

  angular
    .module('enkiApp')
    .factory('cacheUserFactory', cacheUserFactory);

    /** @ngInject */
    cacheUserFactory.$inject = [];

    function cacheUserFactory() {

        var cacheUserInfoFlag = false;
        var cacheLogoutFlag = false;

        //Initialize FirebaseAuth
        var factory = {
            cachingUserFlag: cachingUserFlag,
            readCacheFlag: readCacheFlag,
            cachingLogoutFlag: cachingLogoutFlag,
            readLogoutFlag: readLogoutFlag

        };

        return factory;

        function cachingUserFlag(flag) {
            cacheUserInfoFlag = flag;
        }

        function readCacheFlag() {
            return cacheUserInfoFlag;
        }

        function cachingLogoutFlag(flag) {
            cacheUserInfoFlag = flag;
        }

        function readLogoutFlag() {
            return cacheLogoutFlag;
        }

    }
})();



