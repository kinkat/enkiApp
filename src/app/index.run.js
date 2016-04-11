(function() {
  'use strict';

  angular
    .module('enkiApp')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
