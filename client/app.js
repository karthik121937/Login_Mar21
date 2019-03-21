

angular.module("karthikApp", [
    "karthikApp.auth",
    "karthikApp.services",
    "ngRoute"
])
.config(function($routeProvider,$httpProvider,$locationProvider){
    console.log("came hereee")
    $routeProvider
    // .when('/',{
    //     templateUrl: 'index'
    // })
    .when('/signin',{
        templateUrl: 'auth/signin.html',
        controller: 'AuthController'
    })
    .when('/signup', {
        templateUrl: 'auth/signup.html',
        controller: 'AuthController'
    })
    .when('/logout', {
        templateUrl: 'auth/signin.html',
        controller: 'AuthController'
    })
    .otherwise({
        redirectTo: "/"
      });
        
        $locationProvider.html5Mode(true);
        $httpProvider.interceptors.push('AttachTokens');
})
.controller('AppController', function ($scope, Auth, $rootScope) {
    $rootScope.hasSession = Auth.isAuthenticated();
    $scope.signout = function(){
      Auth.signout();
    }
  })
  .factory('AttachTokens', function ($window) {
    // this is an $httpInterceptor
    // its job is to stop all out going request
    // then look in local storage and find the user's token
    // then add it to the header so the server can validate the request
    var attach = {
      request: function (object) {
        var jwt = $window.localStorage.getItem('karthikAppToken');
        if (jwt) {
          object.headers['x-access-token'] = jwt;
        }
        object.headers['Allow-Control-Allow-Origin'] = '*';
        return object;
      }
    };
    return attach;
  })
  
  // run directive
  .run(function($rootScope, $location, Auth){
    $rootScope.$on('$routeChangeStart', function(event, next, current){
      // console.log("NEXT: ", next);
      if (next.$$route && next.$$route.authenticate && !Auth.isAuthenticated()) {
        $location.path('/signin');
      }
      $rootScope.hasSession = Auth.isAuthenticated();
    });
  });


// angular.module("karthikApp", [
//     "karthikApp.auth",
//     "karthikApp.lists",
//     "karthikApp.services",
//     "ngRoute",
//     "ui.bootstrap"
//   ])
//   .config(function ($routeProvider, $httpProvider) {
//     $routeProvider
//       .when('/signin', {
//         templateUrl: 'auth/signin.html',
//         controller: 'AuthController'
//       })
//       .when('/signup', {
//         templateUrl: 'auth/signup.html',
//         controller: 'AuthController'
//       })
//       .when('/logout', {
//         templateUrl: 'auth/signin.html',
//         controller: 'AuthController'
//       })
//       .when('/mylists', {
//         templateUrl: 'lists/mylists.html',
//         controller: 'ListsController',
//         authenticate: true
//       })
      
//       .otherwise({
//         redirectTo: "/index"
//       });
  
//       $httpProvider.interceptors.push('AttachTokens');
//   })
  
//   // main app controller, not inside a ng-view, hanldes signout
//   .controller('AppController', function ($scope, Auth, $rootScope) {
//     $rootScope.hasSession = Auth.isAuthenticated();
//     $scope.signout = function(){
//       Auth.signout();
//     }
//   })
  
//   .factory('AttachTokens', function ($window) {
//     // this is an $httpInterceptor
//     // its job is to stop all out going request
//     // then look in local storage and find the user's token
//     // then add it to the header so the server can validate the request
//     var attach = {
//       request: function (object) {
//         var jwt = $window.localStorage.getItem('karthikAppToken');
//         if (jwt) {
//           object.headers['x-access-token'] = jwt;
//         }
//         object.headers['Allow-Control-Allow-Origin'] = '*';
//         return object;
//       }
//     };
//     return attach;
//   })
  
//   // run directive
//   .run(function($rootScope, $location, Auth){
//     $rootScope.$on('$routeChangeStart', function(event, next, current){
//       // console.log("NEXT: ", next);
//       if (next.$$route && next.$$route.authenticate && !Auth.isAuthenticated()) {
//         $location.path('/signin');
//       }
//       $rootScope.hasSession = Auth.isAuthenticated();
//     });
//   });


