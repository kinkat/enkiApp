//caching gameID from memo.controller

(function() {
  'use strict';

  angular
      .module('enkiApp')
      .service('gameCacheService', gameCacheService);

  /** @ngInject */

    function gameCacheService() {

        var gameCacheVm = this;
        gameCacheVm.gameId = {};
        gameCacheVm.cachingGameId = cachingGameId;
        gameCacheVm.readingGameId = readingGameId;

        function cachingGameId(cardValHtml) {
            gameCacheVm.gameId.val = cardValHtml;
        }

        function readingGameId() {
            return gameCacheVm.gameId;
        }
    }

})();
