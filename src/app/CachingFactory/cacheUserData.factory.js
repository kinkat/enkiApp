(function() {
  'use strict';

  angular
    .module('enkiApp')
    .factory('cacheUserFactory', cacheUserFactory);

    /** @ngInject */
    cacheUserFactory.$inject = [];

    function cacheUserFactory() {

        var cacheUserInfoFlag = false;

        //Initialize FirebaseAuth
        var factory = {
            cachingUserFlag: cachingUserFlag,
            readCacheFlag: readCacheFlag
        };

        return factory;

        function cachingUserFlag(flag) {
            cacheUserInfoFlag = flag;
        }

        function readCacheFlag() {
            return cacheUserInfoFlag;
        }

    }
})();



