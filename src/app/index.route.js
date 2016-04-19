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
        resolve: {

            "currentAuth": ["authFactory", function(authFactory) {
                console.log(authFactory.auth());
                var auth = authFactory.auth();
                console.log(auth);
                return auth.$requireAuth();
            }]
        }


    })

        .otherwise({
        redirectTo: '/'
      });
  }

})();
