(function() {
  'use strict';

  angular
    .module('enkiApp')
    .config(routeConfig);

  function routeConfig($routeProvider, $locationProvider) {

    $routeProvider
      .when('/', {
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main'

      }),

    $routeProvider
      .when('/test', {
        templateUrl: 'app/test/test.html',
        resolve: {

            "currentAuth": ["authFactory", function(authFactory) {
                var auth = authFactory.auth();
                return auth.$requireAuth();
            }]
        }

    })

        .otherwise({
        redirectTo: '/'
      });
  }

})();
