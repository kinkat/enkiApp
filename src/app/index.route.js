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

      })

        .when('/login', {
        templateUrl: 'app/components/register/register.html',
        controller: 'RegisterController',
        controllerAs: 'RegisterCtrl'

      })

        .when('/gamepanel', {
        templateUrl: 'app/components/memoGame/gamePanel.html',
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
