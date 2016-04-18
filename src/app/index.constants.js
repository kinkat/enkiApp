/* global malarkey:false, moment:false */
(function() {
  'use strict';

  angular
    .module('enkiApp')
    .constant('FBMSG', 'https://enkibot.firebaseio.com/users')
    .constant('malarkey', malarkey)
    .constant('moment', moment);

})();
