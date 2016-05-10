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

        .when('/admin', {
        templateUrl: 'app/components/adminPanel/adminPanel.html',
        resolve: {
            //           "currentAuth": ["authFactory", function(authFactory) {
            //     var auth = authFactory.auth();
            //     return auth.$requireAuth();
            // }]
          "areYouAdmin" : function($q, authFactory, cacheUserFactory,$location, toastr){
            var check = $q.defer();
            cacheUserFactory.readCacheUserId()
              .then(function(userId){
                  authFactory.getUserData(userId)
                      .then(function(UserDataObj){
                        if(UserDataObj.isAdmin){
                          check.resolve();
                        }else{
                          toastr.error("You don't have permission to access" );
                          check.reject();
                          $location.path( "/login" );
                        }
                      });
                    return check.promise;
                });

          }
        },
        controller: 'AdminController',
        controllerAs: 'AdminCtrl'

      })

        .otherwise({
        redirectTo: '/'
      });
    }

})();
