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

      })

        .when('/gamepanel',{
        templateUrl: 'app/components/memoGame/gamePanel.html',
        resolve: {

            "currentAuth": ["authFactory", function(authFactory) {
                var auth = authFactory.auth();
                return auth.$requireAuth();
            }]
        }

        })

        .when('/leaderboard', {
        templateUrl: 'app/leaderboard/leaderboard.html',
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
