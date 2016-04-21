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
        templateUrl: 'app/leaderboard/leaderboard.html',
        controller: 'MainController',
        controllerAs: 'main',

        resolve: {

            "currentAuth": ["authFactory", function(authFactory) {
                var auth = authFactory.auth();
                return auth.$requireAuth();
            }]
        }

    }),

    $routeProvider
      .when('/animals', {
        templateUrl: 'app/components/animalGame/animalMemo.html',
        controller: 'MainController',
        controllerAs: 'main',

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
