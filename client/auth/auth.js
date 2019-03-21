angular.module('karthikApp.auth', [])// make an auth module

.controller('AuthController', function ($scope, $window, $location, Auth) {


  $scope.signin = function () {
    Auth.signin($scope.user)
      .then(function (data) {
        console.log(data.address);
        //Save token, user_id and address to local storage
        $window.localStorage.setItem('karthikApptoken', data.token)
        $window.localStorage.setItem('karthikAppuser', data.userid);
        $location.path('/mylists');
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  $scope.signup = function () {
    Auth.signup($scope.user)
      .then(function (data) {
        $window.localStorage.setItem('karthikApptoken', data.token);
        // saving username to localstorage
        $window.localStorage.setItem('karthikAppuser', data.userid);
        $location.path('/mylists');
      })
      .catch(function (error) {
        console.error(error);
      });
  };
});
