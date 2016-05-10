/* global malarkey:false, moment:false */
(function() {
  'use strict';

  angular
    .module('enkiApp')
    .constant('FBMSG', 'https://enkibot.firebaseio.com/users/')
    .constant('UBASE', 'https://enkibot.firebaseio.com/comments')
    .constant('QBASE', 'https://enkibot.firebaseio.com/questions/')
    .constant('malarkey', malarkey)
    .constant('moment', moment);

})();
