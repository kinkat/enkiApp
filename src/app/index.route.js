(function() {
  'use strict';

  angular
    .module('enkiApp')
    .config(routeConfig);

  function routeConfig($routeProvider) {

    $routeProvider
      .when('/', {
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main'

      }),

    $routeProvider
      .when('/test', {
        templateUrl: 'app/test/test.html',
        controller: 'MainController',
        controllerAs: 'main'

    })

        .otherwise({
        redirectTo: '/'
      });
  }

})();
