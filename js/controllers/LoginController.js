//all code is owned by Joshua Edwards @ quicksilver web ltd. please email Joshua@quicksilverweb.uk, re-use is prohibited
angular
.module('sosstation')
.controller('LoginController', [
  '$state', '$rootScope', '$scope', 'dataService', '$cookies',
    function($state, $rootScope, $scope, dataService, $cookies) {
      $scope.$parent.carouselShow = false;

      //Get user email and password and login
      $scope.userLogin = function(loginFRM) {
        var email = $scope.email;
        var password = $scope.password;

        dataService.userLogin(email, password).then(
          function(response) {
            $scope.status = response.status;
            if (response.rowCount > 0) {
              $scope.user = response.data[0];
              localStorage.setItem('User', JSON.stringify($scope.user));
              $state.go('event');
            } else {
              $scope.user = null;
              alert('Incorrect Credentials, Please Try Again!');
            }
          }, function(err) {
            $scope.status = 'Unable to load data ' + err;
          }
        );
      };

      $rootScope.$on('logout', localStorage.clear());

    }]);
